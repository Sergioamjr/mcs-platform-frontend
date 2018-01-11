const DefaultStore = {
  market: [{ bit: 1, the: 2, eht: 3 }, { bit: 5, the: 6, eht: 7 }],
  userViewer: {
    actived: 'saque',
  },
  userInfo: {
    history: [],
    requests: [],
    personal: {},
  },
  auth: {
    user: null,
    validToken: false,
  },
  login: {
    email: null,
    password: null,
  },
  signup: {
    name: null,
    email: null,
    password: null,
    repassword: null,
  },
  lancamento: {

  },
  search: {
    items: [],
    show: false,
  },
  request: {},
}

export default DefaultStore
