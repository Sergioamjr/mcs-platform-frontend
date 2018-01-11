import Store from './../../DefaultStore'
const UPDATE_NAME = 'UPDATE_NAME'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_REPASSWORD = 'UPDATE_REPASSWORD'

const { signup } = Store


export default function reducer(state = signup, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_EMAIL:
      return { ...state, email: payload }
    case UPDATE_PASSWORD:
      return { ...state, password: payload }
    case UPDATE_NAME:
      return { ...state, name: payload }
    case UPDATE_REPASSWORD:
      return { ...state, repassword: payload }
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

export function updateEmail(payload) {
  return {
    type: UPDATE_EMAIL,
    payload,
  }
}

export function updateRepassword(payload) {
  return {
    type: UPDATE_REPASSWORD,
    payload,
  }
}

export function updateName(payload) {
  return {
    type: UPDATE_NAME,
    payload,
  }
}
