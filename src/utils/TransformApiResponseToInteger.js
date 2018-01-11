import _ from 'lodash'

const TransformApiResponseToInteger = (data) => {
  _.map(data, (i) => {
    i.rank = parseInt(i.rank, 10)
    i.percent_change_1h = parseFloat(i.percent_change_1h)
    i.percent_change_24h = parseFloat(i.percent_change_24h)
    i.percent_change_7d = parseFloat(i.percent_change_7d)
    i.price_usd = parseFloat(i.price_usd)
    return i
  })
  return data
}

export default TransformApiResponseToInteger
