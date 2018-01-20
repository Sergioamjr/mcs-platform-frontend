import Store from './../../DefaultStore'

const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const RESET_LOGIN = 'RESET_LOGIN'
const { login } = Store


export default function reducer(state = login, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_EMAIL:
      return { ...state, email: payload }
    case UPDATE_PASSWORD:
      return { ...state, password: payload }
    case RESET_LOGIN:
      return { ...state, password: null, email: null }
    default:
      return state
  }
}

export function updatePassword(payload) {
  return {
    type: UPDATE_PASSWORD,
    payload,
  }
}

export function ResetLogin() {
  return {
    type: RESET_LOGIN,
  }
}

export function updateEmail(payload) {
  return {
    type: UPDATE_EMAIL,
    payload,
  }
}
