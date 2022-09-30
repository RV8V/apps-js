import {
  IExpressionResult,
  JiveValueType,
} from 'JiveScript/Types/JiveVisitorTypes';
import { FunctionContract } from 'JiveScript/Functions/FunctionContract';
import LogClass from 'Decorators/LogClass';
import { ContainerHelper } from 'IOC/Helpers/ContainerHelper';
import { IMessagingService } from 'Services/App/MessagingService';
import { ContainerItems } from 'IOC/Static/ContainerItems';
import { JiveValueClientError } from 'JiveScript/Errors/JiveExceptions';
import Widget from 'Entities/Widget';
import ActionType from 'ValueObjects/Types/Action/ActionType';
import { MessageEvents } from 'ValueObjects/Types/Messaging/MessageEvents';
import { OperationQuestionAnswerInput } from 'ValueObjects/Inputs/Messaging/OperationQuestionAnswerInput';

@LogClass()
export class QuestionFunction extends FunctionContract {
  private title: string;
  private text: string;
  private button1: Widget;
  private button2: Widget;
  private button3: Widget;
  protected minRequiredParams = 4;
  protected maxRequiredParams = 5;
  protected supportsXRange = false;
  public metaData = [
    { propName: 'title', convertTo: JiveValueType.STRING },
    { propName: 'text', convertTo: JiveValueType.STRING },
    { propName: 'button1', convertTo: JiveValueType.NULL },
    { propName: 'button2', convertTo: JiveValueType.NULL },
    { propName: 'button3', convertTo: JiveValueType.NULL },
  ];

  public initialize() {
    const { Params } = this.context;
    const [text, title, ...buttons]: any = Params;
    this.text = text.value;
    this.title = title.value;

    // eslint-disable-next-line
    buttons.map(
      async (button: any, i: number) =>
        // @ts-ignore
        (this[`button${i + 1}`] = button.evaluate())
    );
  }

  public async execute(): Promise<IExpressionResult> {
    const messagingService = ContainerHelper.get<IMessagingService>(
      ContainerItems.IMessagingService
    );
    const { title, text } = this;

    const getValueFromButtonWidget = async (button) => {
      if (!(await button)) return { code: null };
      const widget: any = ((await button) as any).pop();
      return (widget as any).widget.actions.find(
        (a) => a.type === ActionType.CLICK
      );
    };

    const resolvedButton1 = await getValueFromButtonWidget(this.button1);
    const resolvedButton2 = await getValueFromButtonWidget(this.button2);
    const resolvedButton3 = await getValueFromButtonWidget(this.button3);

    const info: OperationQuestionAnswerInput =
      await messagingService.subscribeOperationMessage(
        {
          title,
          text,
          buttonValue1: resolvedButton1.code,
          buttonValue2: resolvedButton2.code,
          buttonValue3: resolvedButton3.code,
        },
        this.context.visitorContext.pubSub,
        MessageEvents.OPERATION_QUESTIONS
      );

    if (!info.accepted) {
      throw new JiveValueClientError('Operation cancelled', this.nodeLocation);
    }

    return [[info.value]];
  }
}
