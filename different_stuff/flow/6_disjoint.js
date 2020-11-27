'use strict'
// @flow

type AddAction = { type: 'add', idAdd: string }
type RemoveAction = { type: 'remove', removeId: string }
type EditAction = { type: 'edit', editId: string }

type Action = AddAction | RemoveAction | EditAction

const handle = (action: Action) => {
  const { type } = action
  if (type === 'add') console.log('addAction')
  else console.log('RemoveAction | EditAction')
}

type SuccessResponse = {| success: true, data: Object |}
type ErrorResponse = {| error: string, data: string |}

type Response = SuccessResponse | ErrorResponse

//const res: Response = { success: true, error: 'Foo' }

/*const handleResponse = (res: Response) => {
  if (typeof res.error === 'string') console.log(res.data.includes('server'))
}*/

const handleResponse = (res: Response) => {
  if (res.error) console.log(res.data.includes('server'))
}
