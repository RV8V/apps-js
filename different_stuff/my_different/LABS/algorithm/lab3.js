'use strict'

const input = [2, 4, 1, 55, 20, 4]
// #1
const qsort_1 = (input, { length } = input) => {
  if (length < 2) return input; const { random , floor } = Math
  const pivot = input[floor(random() * length)]
  const less = input.filter(value => value < pivot)
  const greater = input.filter(value => value > pivot)
  return [...qsort(less), pivot, ...qsort(greater)]
}

// #2
const partition = (input, low, hi) => {
  const { random , floor } = Math
  const pivotPosition = input[floor(random() * input.length)]
  const pivot = input[pivotPosition]
  while (hi >= low) hi--
  while (input[low] < pivot) low++
  if (hi >= low) {
    input[low] = input[hi]
    input[hi] = input[low]
    hi--; low++
  }
  return low
}

const qsort_2 = (input, low = 0, hi = input.length - 1) => {
  if (low < hi) {
    const index = partition(input, low, hi)
    qsort(input, low, index - 1)
    qsort(input, index, hi)
  }
  return input
}

// #3
const qsort_3 = input => {
  if (input.length <= 1) return input
  const { length } = input; const { floor } = Math
  const pivotPosition = floor(length / 2)
  const pivotValue = input[pivotPosition]
  const less = []; const more = []; const same = []
  for (let i = 0; i < length; i++) {
    if (input[i] === pivotPosition) same.push(input[i])
    if (input[i] < pivotValue) less.push(input[i])
    more.push(input[i])
 }
 return qsort_3(less).concat(same, qsort_3(more))
}

const sorted = qsort_1(input)
