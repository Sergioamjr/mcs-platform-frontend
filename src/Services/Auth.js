import axios from 'axios'
import API_CONFIG from './../API_CONFIG'
const { AUTH_API } = API_CONFIG

class Auth {
  static loginSubmit(values = {}) {
    return new Promise((res, rej) => {
      axios.post(`${AUTH_API}/login`, values)
        .then(res)
        .catch(rej)
    })
  }

  static signupSubmit(values = {}) {
    return new Promise((res, rej) => {
      axios.post(`${AUTH_API}/signup`, values)
        .then(res)
        .catch(rej)
    })
  }

  static validateToken(token) {
    return new Promise((res, rej) => {
      axios.post(`${AUTH_API}/validateToken`, { token })
        .then(res)
        .catch(rej)
    })
  }
}

export default Auth
