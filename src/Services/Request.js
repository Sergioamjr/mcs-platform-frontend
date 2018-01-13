import axios from 'axios'
import API_CONFIG from './../API_CONFIG'

class Request {
  static userRequest(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_CONFIG.CLOSE_API}/request`, data)
        .then(resolve)
        .catch(reject)
    })
  }

  static getUserRequests(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_CONFIG.CLOSE_API}/request/search?user=${id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default Request
