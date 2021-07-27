const R = require('ramda')

const form = {
  id: {
    type: 'number',
    title: 'Region id',
    value: ''
  },
  name: {
    type: 'number',
    title: 'Region id',
    value: ''
  },
}

const state = { form, data: [] }

const handleState = (state, event) => {
  return Object.assign({}, state, {
    form: {
      ...state.form,
      [event.target.name]: {
        ...state.form[event.target.name],
        value: event.target.value
      }
    }
  })
}

const handleStateLens = (state, event) => {
  const lens = R.lensPath(['form', event.target.name, 'value'])
  return R.set(lens, event.target.value, state)
}

const changedState = handleState(state, {
  target: {
    name: 'id',
    value: '1'
  }
})

const changedStateLens = handleState(state, {
  target: {
    name: 'id',
    value: '1'
  }
})

console.dir({ changedState, changedStateLens }, { depth: 5 })
