import Store from './../../DefaultStore'

const UPDATE_REQUEST = 'UPDATE_REQUEST'
const RESET_REQUEST = 'RESET_REQUEST'
const UPDATE_VALUE = 'UPDATE_VALUE'
const { request } = Store


export default function reducer(state = request, action) {
  const { type, payload } = action
  switch (type) {
    case RESET_REQUEST:
      return {
        ...state, userId: null, date: null, userName: null, action: null, value: null,
      }
    case UPDATE_REQUEST:
      return { ...state, ...payload }
    case UPDATE_VALUE:
      return { ...state, value: payload }
    default:
      return state
  }
}

export function updateRequest(payload) {
  return {
    type: UPDATE_REQUEST,
    payload,
  }
}

export function updateValue(payload) {
  return {
    type: UPDATE_VALUE,
    payload,
  }
}

export function resetRequest() {
  return {
    type: RESET_REQUEST,
  }
}
