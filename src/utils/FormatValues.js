import currency from 'currency.js'

const codeMap = {
  BRL: {
    symbol: 'R$',
    precision: 2,
    separator: '.',
  },
  USD: {
    symbol: 'US$',
    precision: 2,
    separator: '.',
  },
}

const FormatValues = (value, code = 'BRL') => currency(value, codeMap[code]).format(true)

export default FormatValues
