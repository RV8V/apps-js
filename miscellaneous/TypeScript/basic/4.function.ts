
interface IPosition {
  x: number | undefined
  y: number | undefined
}

interface INext extends IPosition {
  default: string
}

interface ILast extends INext {
  value: string
}

function overload(): IPosition
function overload(a: number): INext
function overload(a: number, b: number): ILast

function overload(a?: number, b?: number) {
  if (!a && !b) return { x: undefined, y: undefined }
  if (a && !b) return { x: 48, y: 40, default: 'default' }
  return { x: undefined, y: undefined, default: 'default value', value: 'returned value' }
}

overload()
overload(30)
overload(39, 39)
