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

    const serializersFactory = (fn, key) => value => {
      if (fn(value)) return key
    }

    const isDate = string => {
      const matchString = (str: string) => Boolean(/^[a-zA-Z]+$/.test(str))
      return !matchString(string) && (JiveValueValidator.isDateString(string) || JiveValueValidator.isDateValue(string) || matchDateInString(string))
    }

    const isEmpty = string => string === ''

    const serializerRecords: Record<string, Function> = {
      number: JiveValueValidator.isNumbericValue.bind(JiveValueValidator),
      string: JiveValueValidator.isTextValue.bind(JiveValueValidator),
      boolean: JiveValueValidator.isBooleanValue.bind(JiveValueValidator),
      date: isDate,
      null: isEmpty
    }

    const typeCheckerFn = ([type, fn]) => {
      const typeChecker = serializersFactory(fn, type)
      try {
        return typeChecker(_value)
      } catch (err) {
        return typeof _value
      }
    }

    const serializerKey = Object.entries(serializerRecords)
      .map(typeCheckerFn)
      .filter(Boolean)
      .pop()

    try {
      Params[0].value = serializers[serializerKey](_value)
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
