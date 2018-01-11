import Store from './../../DefaultStore'

const UPDATE_SEARCH = 'UPDATE_SEARCH'
const RESET_SEARCH = 'RESET_SEARCH'
const { search } = Store


export default function reducer(state = search, action) {
  const { type, payload } = action
  switch (type) {
    case RESET_SEARCH:
      return { ...state, items: [], show: false }
    case UPDATE_SEARCH:
      return { ...state, items: payload, show: true }
    default:
      return state
  }
}

export function updateSearch(payload) {
  return {
    type: UPDATE_SEARCH,
    payload,
  }
}

export function resetSearch() {
  return {
    type: RESET_SEARCH,
  }
}
