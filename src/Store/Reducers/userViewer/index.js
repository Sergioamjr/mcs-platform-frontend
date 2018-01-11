import Store from './../../DefaultStore'

const { userViewer } = Store

const SET = 'SET_USER_VIEWER'

export default function reducer(state = userViewer, action = {}) {
  switch (action.type) {
    case SET:
      return { ...state, actived: action.payload }
    default: return state
  }
}

export function SetUserViewer(payload) {
  return {
    type: SET,
    payload,
  }
}
