import { IExpressionResult, JiveValueType } from 'JiveScript/Types/JiveVisitorTypes'
import { FunctionContract } from 'JiveScript/Functions/FunctionContract'
import { JiveValueValidator } from 'JiveScript/helpers/JiveValueValidator'

// const wrapSome = (fns: Function[], value: any) => fns.some(fn => fn(value))
const wrapSome = (fns: Function[]) => (value: any) => fns.some(fn => fn(value))

export class GetTypeFunction extends FunctionContract {
  private value: any

  protected minRequiredParams = 1
  protected maxRequiredParams = 1
  protected supportsXRange = true
  public metaData = [
    { propName: 'value', convertTo: JiveValueType.NULL }
  ]

  public runFunctionSpecificParamConversion (): void {}

  public initialize () {
    const { Params } = this.context
    const [inputValue] = Params

    this.value = inputValue.value
  }

  public async execute (): Promise<IExpressionResult> {
    const { value } = this

    const serializers: Record<string, Function> = {
      constant: JiveValueValidator.isConstant.bind(JiveValueValidator),
      error: wrapSome(
        [
          JiveValueValidator.isJiveError.bind(JiveValueValidator),
          JiveValueValidator.isJiveErrorLabel.bind(JiveValueValidator),
          JiveValueValidator.jiveError.bind(JiveValueValidator)
        ]
      ),
      empty: JiveValueValidator.isEmptyValue.bind(JiveValueValidator),
      image: JiveValueValidator.isImageType.bind(JiveValueValidator),
      url: JiveValueValidator.isValidUrl.bind(JiveValueValidator),
      numeric: JiveValueValidator.isNumbericValue.bind(JiveValueValidator),
      date: wrapSome(
        [
          JiveValueValidator.isDateString.bind(JiveValueValidator),
          JiveValueValidator.isDateValue.bind(JiveValueValidator)
        ]
      ),
      text: JiveValueValidator.isTextValue.bind(JiveValueValidator),
      boolean: JiveValueValidator.isBooleanValue.bind(JiveValueValidator)
    }

    const serializersFactory = (fn: Function, key: string, value: string) => {
      if (fn(value)) return key
      return undefined
    }

    const typeCheckerFn = (value: any) => ([type, validator]: [string, Function]) => {
      try {
        return serializersFactory(validator, type, value)
      } catch (err) {
        return typeof value
      }
    }

    const getSerializerKey = (value: any) => Object.entries(serializers)
      .map(typeCheckerFn(value))
      .filter(Boolean)
      .shift()

    console.log({ value })

    const type = getSerializerKey(value)
    console.log({ type })

    return type as string

  //   //
  //   //

  //   if (JiveValueValidator.isConstant(value)) {
  //     return 'constant'
  //   }
  //   // if (JiveValueValidator.isJiveError(value) || JiveValueValidator.isJiveErrorLabel(value) || JiveValueValidator.jiveError(value)) {
  //   //   return 'error'
  //   // }
  //   if (wrapSome([JiveValueValidator.isJiveError, JiveValueValidator.isJiveErrorLabel, JiveValueValidator.jiveError], value)) {
  //     return 'error'
  //   }
  //   if (JiveValueValidator.isEmptyValue(value)) {
  //     return 'empty'
  //   }
  //   if (JiveValueValidator.isImageType(value)) {
  //     return 'image'
  //   }
  //   if (JiveValueValidator.isValidUrl(value)) {
  //     return 'url'
  //   }
  //   if (JiveValueValidator.isNumbericValue(value)) {
  //     return 'numeric'
  //   }
  //   // if (JiveValueValidator.isDateString(value) || JiveValueValidator.isDateValue(value)) {
  //   //   return 'date'
  //   // }
  //   if (wrapSome([JiveValueValidator.isDateString, JiveValueValidator.isDateValue], value)) {
  //     return 'date'
  //   }
  //   if (JiveValueValidator.isTextValue(value)) {
  //     return 'text'
  //   }
  //   if (JiveValueValidator.isBooleanValue(value)) {
  //     return 'boolean'
  //   }

  //   return typeof value
  // }
  // //
}

//********************************** */

// import { IExpressionResult, JiveValueType } from 'JiveScript/Types/JiveVisitorTypes'
// import { FunctionContract } from 'JiveScript/Functions/FunctionContract'
// import { JiveValueValidator } from 'JiveScript/helpers/JiveValueValidator'

// const wrapSome = (fns: Function[]) => (value: any) => fns.some(fn => fn(value))

// export class GetTypeFunction extends FunctionContract {
//   private value: any

//   protected minRequiredParams = 1
//   protected maxRequiredParams = 1
//   protected supportsXRange = true
//   public metaData = [
//     { propName: 'value', convertTo: JiveValueType.NULL }
//   ]

//   public runFunctionSpecificParamConversion (): void {}

//   public initialize () {
//     const { Params } = this.context
//     const [inputValue] = Params

//     this.value = inputValue.value
//   }

//   public async execute (): Promise<IExpressionResult> {
//     const { value } = this

//     const serializers: Record<string, Function> = {
//       constant: JiveValueValidator.isConstant.bind(JiveValueValidator),
//       error: wrapSome(
//         [
//           JiveValueValidator.isJiveError.bind(JiveValueValidator),
//           JiveValueValidator.isJiveErrorLabel.bind(JiveValueValidator),
//           JiveValueValidator.jiveError.bind(JiveValueValidator)
//         ]
//       ),
//       empty: JiveValueValidator.isEmptyValue.bind(JiveValueValidator),
//       image: JiveValueValidator.isImageType.bind(JiveValueValidator),
//       url: JiveValueValidator.isValidUrl.bind(JiveValueValidator),
//       numeric: JiveValueValidator.isNumbericValue.bind(JiveValueValidator),
//       date: wrapSome(
//         [
//           JiveValueValidator.isDateString.bind(JiveValueValidator),
//           JiveValueValidator.isDateValue.bind(JiveValueValidator)
//         ]
//       ),
//       text: JiveValueValidator.isTextValue.bind(JiveValueValidator),
//       boolean: JiveValueValidator.isBooleanValue.bind(JiveValueValidator)
//     }

//     const serializersFactory = (fn: Function, key: string, value: string) => {
//       if (fn(value)) return key
//       return undefined
//     }

//     const typeCheckerFn = (value: any) => ([type, validator]: [string, Function]) => {
//       try {
//         return serializersFactory(validator, type, value)
//       } catch (err) {
//         return typeof value
//       }
//     }

//     const getSerializerKey = (value: any) => Object.entries(serializers)
//       .map(typeCheckerFn(value))
//       .filter(Boolean)
//       .shift()

//     return getSerializerKey(value) as string
//   }
// }
