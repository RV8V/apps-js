import {
  Argument,
  IExpressionResult,
  ITableValue,
  JiveValueType,
} from 'JiveScript/Types/JiveVisitorTypes';
import { FunctionContract } from 'JiveScript/Functions/FunctionContract';
import { JiveValueClientError } from 'JiveScript/Errors/JiveExceptions';
import LogClass from 'Decorators/LogClass';
import { JiveValueValidator } from 'JiveScript/helpers/JiveValueValidator';
import { JiveValueConvertor } from 'JiveScript/helpers/JiveValueConvertor';

@LogClass()
export class RangeFunction extends FunctionContract {
  private range: ITableValue;
  private rowStart: number;
  private columnStart: number;
  private rowEnd?: number;
  private columnEnd?: number;
  protected minRequiredParams = 3;
  protected maxRequiredParams = 5;
  protected supportsXRange = false;
  public metaData = [
    { propName: 'range', convertTo: JiveValueType.TABLE },
    { propName: 'rowStart', convertTo: JiveValueType.NUMBER },
    { propName: 'columnStart', convertTo: JiveValueType.NUMBER },
    { propName: 'rowEnd', convertTo: JiveValueType.NUMBER },
    { propName: 'columnEnd', convertTo: JiveValueType.NUMBER },
  ];

  public runFunctionSpecificParamConversion(): void {
    const { Params } = this.context;
    const range = this.context.Params[0].value;

    if (Params.length === 4) {
      throw new JiveValueClientError(
        'If parameter 4 is defined, parameter 5 must be defined as well.',
        this.context.Params[3].location
      );
    }

    Params[1].value = this.convertToValidIndex(Params[1], range, true, 2);
    Params[2].value = this.convertToValidIndex(Params[2], range, false, 3);

    if (Params[3]) {
      Params[3].value = this.convertToValidIndex(Params[3], range, true, 4);
    }

    if (Params[4]) {
      Params[4].value = this.convertToValidIndex(Params[4], range, false, 5);
    }
  }

  public initialize() {
    this.range = this.context.Params[0].value;
    this.rowStart = this.context.Params[1].value;
    this.columnStart = this.context.Params[2].value;
    this.rowEnd = this.context.Params[3]
      ? this.context.Params[3].value
      : undefined;
    this.columnEnd = this.context.Params[4]
      ? this.context.Params[4].value
      : undefined;
  }

  public async execute(): Promise<IExpressionResult> {
    let { range, rowStart, rowEnd, columnStart, columnEnd } = this;

    if (rowEnd === undefined || columnEnd === undefined) {
      return range[rowStart][columnStart];
    }

    if (rowStart > rowEnd) {
      const temp = rowStart;
      rowStart = rowEnd;
      rowEnd = temp;
    }

    if (columnStart > columnEnd) {
      const temp = columnStart;
      columnStart = columnEnd;
      columnEnd = temp;
    }

    if (range.length === 1) {
      const start = range[rowStart][columnStart];
      if (columnStart === columnEnd) {
        return [[start]];
      }
      return [range[rowStart].slice(columnStart, columnEnd + 1)];
    }

    const result: ITableValue = [];
    for (let i = rowStart, t = 0; i <= rowEnd; ++i, ++t) {
      result[t] = [];
      for (let j = columnStart; j <= columnEnd; ++j) {
        result[t].push(range[i][j]);
      }
    }

    return result;
  }

  private convertToValidIndex(
    field: Argument,
    range: any[],
    isRow: boolean,
    index: number
  ): number | undefined {
    const paramNames: { [key: number]: string } = {
      2: 'Row Start',
      3: 'Column Start',
      4: 'Row End',
      5: 'Column End',
    };
    if (JiveValueValidator.isTableValue(field.value)) {
      field.value = JiveValueConvertor.toSimpleValue(field.value);
    }

    if (
      typeof field.value === 'string' &&
      field.value.toLowerCase() !== 'last'
    ) {
      throw new JiveValueClientError(
        `Function ${this.context.Name} expects parameter ${index} "${paramNames[index]}" to be of type positive number or string "last". 
          But instead "${field.value}" was provided.`,
        field.location
      );
    } else if (
      (typeof field.value === 'string' &&
        field.value.toLowerCase() === 'last') ||
      field.value > range.length
    ) {
      if (range.length === 1 && (index === 5 || index === 3)) {
        return field.value - 1;
      }
      return isRow ? range.length - 1 : range[0].length - 1;
    } else if (typeof field.value === 'number') {
      return field.value === 0 ? 0 : --field.value;
    } else {
      return undefined;
    }
  }
}
