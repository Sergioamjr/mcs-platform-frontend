import axios from 'axios'
import API_CONFIG from './../API_CONFIG'
import { TransformPaymentRequest } from './../utils'

class Payments {
  static createUser(values) {
    return this.submitUser(values, 'post')
  }

  static updateUser(values) {
    return this.submitUser(values, 'put')
  }

  static submitUser(values, method) {
    const id = values._id || ''
    return new Promise((resolve, reject) => {
      axios[method](`${API_CONFIG.CLOSE_API}/userinfo/${id}`, values)
        .then(resolve)
        .catch(reject)
    })
  }

  static getUserInfo(user = '') {
    return new Promise((resolve, reject) => {
      axios.get(`${API_CONFIG.CLOSE_API}/payment/search?user=${user}`)
        .then(({ data }) => data)
        .then(TransformPaymentRequest)
        .then(resolve)
        .catch(reject)
    })
  }

  static GetAllPayments() {
    return new Promise((resolve, reject) => {
      axios.get(`${API_CONFIG.CLOSE_API}/payment/`)
        .then(resolve)
        .catch(reject)
    })
  }

  static DeletePayment(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${API_CONFIG.CLOSE_API}/payment/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default Payments
