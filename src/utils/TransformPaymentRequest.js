import _ from 'lodash'
import moment from 'moment'

const isAvaliable = value => {
  const data = moment(new Date(value))
  return moment(new Date()).diff(data, 'days') > 30
}

const isNotAvaliable = value => {
  const data = moment(new Date(value))
  return moment(new Date()).diff(data, 'days') <= 30
}

const isMorethanNow = value => {
  return new Date(value) < new Date()
}

const TransformPaymentRequest = values => {
  const saque = values.filter(item => item.tipo === 'SAQUE').filter(item => isMorethanNow(item.data))
  const rendimento = values.filter(item => item.tipo === 'RENDIMENTO').filter(item => isAvaliable(item.data))
  const investimento = values.filter(item => item.tipo === 'INVESTIMENTO').filter(item => isAvaliable(item.data))


  const frozenRend = values.filter(item => item.tipo === 'RENDIMENTO').filter(item => isNotAvaliable(item.data))
  const frozenInv = values.filter(item => item.tipo === 'INVESTIMENTO').filter(item => isNotAvaliable(item.data))

  const rendimentoCongelado = _.reduce(frozenRend, (totalValue, totalItem) => { return totalValue + totalItem.value }, 0)
  const investimentoCongelado = _.reduce(frozenInv, (totalValue, totalItem) => { return totalValue + totalItem.value }, 0)

  values.rendimento = _.reduce(rendimento, (totalValue, totalItem) => { return totalValue + totalItem.value }, 0)
  values.saque = _.reduce(saque, (totalValue, totalItem) => { return totalValue + totalItem.value }, 0)
  values.investimento = _.reduce(investimento, (totalValue, totalItem) => { return totalValue + totalItem.value }, 0)
  values.congelado = rendimentoCongelado + investimentoCongelado
  values.totalAmount  = values.rendimento + values.investimento - values.saque
  return values
}

export default TransformPaymentRequest
