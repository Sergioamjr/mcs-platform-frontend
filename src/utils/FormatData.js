import moment from 'moment'

const FormatData = data => moment(new Date(data)).format('DD/MM/YYYY')

export default FormatData
