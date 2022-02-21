const polygonArea = polygon => {
    let value = 0;
    let d = polygon[polygon.length - 1]
    for (const p of polygon) {
        value += p.x * d.y - d.x * p.y
        d = p
    }
    return Math.abs(value / 2)
}

const polygon = [
    { x: 0, y: 0 },
    { x: 15, y: 15 },
    { x: 0, y: 15 }
]

////////////////////////////////

const pipe = (...fns) => arg => fns.reduce((prev, fn) => fn(prev), arg)
const last = xs => xs[xs.length - 1]
const count = acc => ({ x, y }) => ({ value: acc.pointer.x * y - x * acc.pointer.y, pointer: { x, y } })
const divide = n => v => v / n
const abs = v => Math.abs(v)

const map = polygon => polygon.reduce((acc, v) => count(acc)(v), { value: 0, pointer: last(polygon) });
const area = polygon => pipe(divide(2), abs)(map(polygon).value)

console.log({
  polygonArea: polygonArea(polygon),
  polygon: area(polygon)
})
