import Store from './../../DefaultStore'

const SUBMIT_FORM = 'SUBMIT_FORM'
const RESET_FORM = 'RESET_FORM'
const INCREMENTE_USER = 'INCREMENTE_USER'
const UPDATE_TYPE = 'UPDATE_TYPE'

const { lancamento } = Store


export default function reducer(state = lancamento, action) {
  const { type, payload } = action
  switch (type) {
    case RESET_FORM:
      return {
        ...state, userName: null, userId: null, value: 0, data: null,
      }
    case SUBMIT_FORM:
      return { ...state, ...payload, value: parseInt(payload.value.replace(/\D/g, ''), 10) }
    case UPDATE_TYPE:
      return { ...state, tipo: payload }
    case INCREMENTE_USER:
      return { ...state, ...payload }
    default:
      return state
  }
}

export function submitForm(payload) {
  return {
    type: SUBMIT_FORM,
    payload,
  }
}

export function updateType(payload) {
  return {
    type: UPDATE_TYPE,
    payload,
  }
}

export function incrementUser(payload) {
  return {
    type: INCREMENTE_USER,
    payload,
  }
}

export function resetForm() {
  return {
    type: RESET_FORM,
  }
}
