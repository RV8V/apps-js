import { IExpressionResult, JiveValueType } from 'JiveScript/Types/JiveVisitorTypes'
import { FunctionContract } from 'JiveScript/Functions/FunctionContract'
import LogClass from 'Decorators/LogClass'
import { JiveValueValidator } from 'JiveScript/helpers/JiveValueValidator'

const convertFromTimeStampToUTC = (timestamp: Date) => {
  const [dateTime] = timestamp.toISOString().split('T')
  const [year, month, day]: string[] = dateTime.split('-')
  return `${day}-${month}-${year}`
}

const checkImageType = (str: string) => {
  const imageTypesRegexp = /jpeg|jpg|png|gif|bmp/
  return Boolean(str.match(imageTypesRegexp))
}

const isDateString = (str: string) => Boolean([
  JiveValueValidator.isDateString,
  JiveValueValidator.isDateValue
].map(fn => fn(str)).filter(Boolean).length)

@LogClass()
export class TextFunction extends FunctionContract {
  private text: string
  protected supportsXRange = true
  protected minRequiredParams = 1
  protected maxRequiredParams = 1
  public metaData = [
    { propName: 'text', convertTo: JiveValueType.NULL }
  ]

  public initialize () {
    this.text = this.context.Params[0].value
  }

  public runFunctionSpecificParamConversion () {
    const { Params } = this.context
    const text = Params[0].value

    if (JiveValueValidator.isTextValue(text) && checkImageType(text)) {
      Params[0].value = `${process.env.QA_IMAGES_URL}${text}`
      return
    }
    if (isDateString(text)) {
      Params[0].value = convertFromTimeStampToUTC(text)
    }
  }

  public async execute (): Promise<IExpressionResult> {
    return this.text
  }
}
