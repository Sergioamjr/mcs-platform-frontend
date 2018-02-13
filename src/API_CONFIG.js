const HOSTNAME = window.location.hostname
let CLOSE_API
let AUTH_API

if (/localhost/.test(HOSTNAME)) {
  CLOSE_API = 'http://localhost:3003/api'
  AUTH_API = 'http://localhost:3003/oapi'
} else {
  CLOSE_API = 'https://mcs-platform-backend.herokuapp.com/api'
  AUTH_API = 'https://mcs-platform-backend.herokuapp.com/oapi'
}

console.log(HOSTNAME, {
  CLOSE_API,
  AUTH_API,
})

const API_CONFIG = {
  CLOSE_API,
  AUTH_API,
}


export default API_CONFIG
