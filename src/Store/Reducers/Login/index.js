import Store from './../../DefaultStore'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const { login } = Store


export default function reducer(state = login, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_EMAIL:
      return { ...state, email: payload }
    case UPDATE_PASSWORD:
      return { ...state, password: payload }
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
