import Store from './../../DefaultStore'
const userKey = '_mymoney_user'
const TOKEN_VALIDATED = 'TOKEN_VALIDATED'
const USER_FETCHED = 'USER_FETCHED'
const { auth } = Store

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)) || auth,
  validToken: false
}

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action
  switch (type) {
    case TOKEN_VALIDATED:
      if (payload) {
        return { ...state, validToken: true }
      } else {
        localStorage.removeItem(userKey)
        return { ...state, validToken: false, user: null }
      }
    case USER_FETCHED:
      localStorage.setItem(userKey, JSON.stringify(payload))
      return { ...state, user: payload, validToken: true }
    default:
      return state
  }
}

export function validToken(payload) {
  return {
    type: TOKEN_VALIDATED,
    payload,
  }
}

export function fetchUser(payload) {
  return {
    type: USER_FETCHED,
    payload,
  }
}
