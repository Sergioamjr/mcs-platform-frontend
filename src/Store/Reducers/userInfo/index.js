import Store from './../../DefaultStore'

const { userInfo } = Store

const SET_HISTORY = 'SET_USER_HISTORY'
const GET_REQUESTS = 'GET_REQUESTS'
const GET_PAYMENTS = 'GET_PAYMENTS'
const RESET_USERINFO = 'RESET_USERINFO'
const GET_PERSONAL_USER_INFO = 'GET_PERSONAL_USER_INFO'

export default function reducer(state = userInfo, action = {}) {
  switch (action.type) {
    case GET_PERSONAL_USER_INFO:
      return { ...state, personal: action.payload }
    case SET_HISTORY:
      return { ...state, history: action.payload }
    case GET_REQUESTS:
      return { ...state, requests: action.payload }
    case GET_PAYMENTS:
      return { ...state, payments: action.payload }
    case RESET_USERINFO:
      return {
        ...state, requests: [], history: [], personal: {}, payments: [],
      }
    default: return state
  }
}

export function GetUserPayments(payload) {
  return {
    type: GET_PAYMENTS,
    payload,
  }
}

export function SetUserHistory(payload) {
  return {
    type: SET_HISTORY,
    payload,
  }
}

export function GetPersonalUserInfo(payload) {
  return {
    type: GET_PERSONAL_USER_INFO,
    payload,
  }
}

export function GetUserRequests(payload) {
  return {
    type: GET_REQUESTS,
    payload,
  }
}

export function ResetUserInfo() {
  return {
    type: RESET_USERINFO,
  }
}

