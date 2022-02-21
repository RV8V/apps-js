const company = {
  dep1: [100, 200, 300],
  dep2: {
    subDep1: [100, 200],
    subDep2: [300, 500],
    subDep3: 100,
    subDep4: {
      field: 200,
      field2: [200, 100],
    }
  },
  dep3: 200,
};

const sum = obj => {
  let result = 0
  for (const val of Object.values(obj)) {
    if (typeof val !== 'object') {
      result += val;
    } else if (typeof val === 'object') {
      result += Object.values(val).reduce((acc, value) => acc + value, result);
    } else if (typeof val === 'array') {
      for (let i = 0; i < val.length; i++) {
        result += val[i]
      }
    }
  }
  return result;
}

const calc = data => {
  let result = 0;
  console.log({ data })
  if (typeof data === 'object') {
    for (const value of data) {
      result += Number(value);
    }
  } else if (typeof data === 'array') {
    for (let i = 0; i < data.length; i++) {
      result += Number(data[i])
    }
  }
  return result;
}
const getSum = (data) => Object.entries(data).reduce((acc, [_, value]) => acc + (typeof value === 'number' ? value : calc(value)), 0);

console.log({ s: getSum(company) })

const arr = [12, 1, 5, 0, 78]

const bubble = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        // console.log({ cur: arr[j], next: arr[j + 1] })
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr;
}

console.log({ b: bubble(arr) })
