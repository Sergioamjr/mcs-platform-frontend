const DefaultStore = {
  market: [{ bit: 1, the: 2, eht: 3 }, { bit: 5, the: 6, eht: 7 }],
  userViewer: {
    actived: 'saque',
  },
  usersDetails: {
    all: [],
    viewSingle: [],
  },
  userInfo: {
    history: [],
    requests: [],
    personal: {},
    isAdmin: false,
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
  lancamento: {},
  payments: [],
  search: {
    items: [],
    show: false,
  },
  request: {},
}

export default DefaultStore
