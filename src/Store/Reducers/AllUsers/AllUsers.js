import Store from './../../DefaultStore'

const SET_ALL_USERS = 'SET_ALL_USERS'
const RESET_ALL_USERS = 'RESET_ALL_USERS'
const { allUsers } = Store


export default function reducer(state = allUsers, action) {
  const { type, payload } = action
  switch (type) {
    case RESET_ALL_USERS:
      return { ...state, allUsers: [] }
    case SET_ALL_USERS:
      return { ...state, ...payload }
    default:
      return state
  }
}

export function SetAllUsers(payload) {
  return {
    type: SET_ALL_USERS,
    payload,
  }
}

export function ResetAllUsers() {
  return {
    type: RESET_ALL_USERS,
  }
}
