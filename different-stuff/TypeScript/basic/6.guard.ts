
const log = (value: number | string) => {
  if (typeof value === 'number') return value.toFixed()
  else return value.toUpperCase()
}

class MyResponse {
  protected readonly message: string = 'hello from server'
  readonly header: string = 'content-type: text/plain'
}

class ErrorResponse {
  public message: string = 'internal server error'
  public errorType: number = 505
}

const hangle = (res: MyResponse | ErrorResponse): void => {
  if (res instanceof MyResponse) console.log('accept data from server', res.header)
  else console.log('get error form our request to server', res.message)
}
