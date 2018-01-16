import Store from './../../DefaultStore'

const SET_PAYMENTS = 'SET_PAYMENTS'
const RESET_FORM = 'RESET_FORM'
const { payments } = Store


export default function reducer(state = payments, action) {
  const { type, payload } = action
  switch (type) {
    case RESET_FORM:
      return { ...state, payments: {} }
    case SET_PAYMENTS:
      // console.log(...state, ...payload)
      return { ...state, payments: { ...payload } }
    default:
      return state
  }
}

export function SetPayments(payload) {
  return {
    type: SET_PAYMENTS,
    payload,
  }
}

export function ResetPayments() {
  return {
    type: RESET_FORM,
  }
}
