import moment from 'moment'

const IsValueFrozen = (actionData, type) => {
  const now = moment(new Date())
  const data = moment(new Date(actionData))
  return (type !== 'SAQUE' && now.diff(data, 'days') <= 30)
}

export default IsValueFrozen
