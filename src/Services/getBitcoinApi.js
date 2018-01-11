import axios from 'axios'

export default class ApiBitcoin {
  static getMarketValues() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/')
  }
}
