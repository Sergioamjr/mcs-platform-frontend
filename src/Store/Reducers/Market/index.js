// Store Default

import Store from './../../DefaultStore'

const { market } = Store

// Actions
const UPDATE = 'UPDATE_MARKET_VALUES'

// Reducer
export default function reducer(state = market, action = {}) {
  switch (action.type) {
    case UPDATE:
      return state
    default: return state
  }
}

export function updateMarketValues(payload) {
  return {
    type: UPDATE,
    payload,
  }
}
