const DefaultStore = {
  market: [{ bit: 1, the: 2, eht: 3 }, { bit: 5, the: 6, eht: 7 }],
  userViewer: {
    actived: 'saque',
  },
  usersDetails: {
    all: [],
    viewSingle: [],
    paymentsHistory: [],
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
    isAdmin: false,
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
