import { IExpressionResult } from 'JiveScript/Types/JiveVisitorTypes'
import { FunctionContract } from 'JiveScript/Functions/FunctionContract'
import LogClass from 'Decorators/LogClass'
import { JiveValueConvertor } from 'JiveScript/helpers/JiveValueConvertor'
import { JiveValueValidator } from 'JiveScript/helpers/JiveValueValidator'

@LogClass()
export class NumberFunction extends FunctionContract {
  private value: number | string
  protected supportsXRange = true
  protected maxRequiredParams = 1
  protected minRequiredParams = 1
  public metaData = []

  public runFunctionSpecificParamConversion (): void {
    const { Params } = this.context
    const _value = Array.isArray(Params[0].value) ? Params[0].value[0][0] : Params[0].value
    const matchDateInString = (string: string) => Boolean(string.match(/^(\d{4})-(\d{2})-(\d{2})/))

    const serializers: Record<string, Function> = {
      number: parseInt,
      string: JiveValueConvertor.textToNumber.bind(JiveValueConvertor),
      boolean: JiveValueConvertor.booleanToNumber.bind(JiveValueConvertor),
      date: JiveValueConvertor.dateToNumber.bind(JiveValueConvertor)
    }

    const isDate = string => {
      const matchString = (str: string) => Boolean(/^[a-zA-Z]+$/.test(str))
      return !matchString(string) && (JiveValueValidator.isDateString(string) || JiveValueValidator.isDateValue(string) || matchDateInString(string))
    }

    const getHandlerKey = value => {
      try {
        if (isDate(value)) return 'date'
        if (value === '') return null
        return typeof value
      } catch (err) {
        return typeof value
      }
    }

    try {
      const key = getHandlerKey(_value)
      Params[0].value = serializers[key!](_value)
    } catch (err) {
      Params[0].value = ''
    }
  }

  public initialize () {
    this.value = this.context.Params[0].value
  }

  public async execute (): Promise<IExpressionResult> {
    return this.value.toString()
  }
}
