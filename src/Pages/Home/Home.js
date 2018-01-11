import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { Request, UserInfo } from './../../Services'
import { GetUserRequests, GetUserPayments } from './../../Store/Reducers/userInfo'
import { FormatValues, FormatData } from './../../utils'
// import { getUserInfo } from './../../Store/Reducers/'

class Home extends React.Component {
  componentDidMount = () => {
    UserInfo.getUserInfo('49785578931')
      .then((data) => this.props.dispatch(GetUserPayments(data)))
      .catch(err => console.log('error', err))
    Request.getUserRequests('49785578931')
      .then(({ data }) => this.props.dispatch(GetUserRequests(data)))
      .catch(err => console.log('error', err))
  }

  renderRequetsList = () => {
    const { userInfo: { requests } } = this.props
    return requests.map((item) => {
      return (
        <TableRow key={item._id} className='striped--near-white'>
          <TableRowColumn>{FormatData(item.date)}</TableRowColumn>
          <TableRowColumn>{item.action}</TableRowColumn>
          <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
          <TableRowColumn>{item.status ? item.status : 'PENDENTE'}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    const { userInfo: { payments } } = this.props
    return (
      <WrapperPage>
        {payments && (
          <FlexContent>
            <BoxContent grid='w-50 w-25-ns pa3'>
              <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
                <span>
                  <p className='c-white mb1 f5'>Saldo Total</p>
                  <p className='c-white f4'>{FormatValues(payments.totalAmount) || FormatValues(0)}</p>
                </span>
              </div>
            </BoxContent>
            <BoxContent grid='w-50 w-25-ns pa3'>
              <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
                <span>
                  <p className='c-white mb1 f5'>Rendimento</p>
                  <p className='c-white f4'>{FormatValues(payments.rendimento) || FormatValues(0)}</p>
                </span>
              </div>
            </BoxContent>
            <BoxContent grid='w-50 w-25-ns pa3'>
              <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
                <span>
                  <p className='c-white mb1 f5'>Congelado</p>
                  <p className='c-white f4'>{FormatValues(payments.congelado) || FormatValues(0)}</p>
                </span>
              </div>
            </BoxContent>
            <BoxContent grid='w-50 w-25-ns pa3'>
              <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
                <span>
                  <p className='c-white mb1 f5'>Lucro</p>
                  <p className='c-white f4'>10%</p>
                </span>
              </div>
            </BoxContent>
          </FlexContent>
        )}
        {this.props.userInfo.requests.length > 0 && (
          <FlexContent>
            <BoxContent grid='w-100 pa3' title='Solicitações'>
              <Table selectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Data</TableHeaderColumn>
                    <TableHeaderColumn>Ação</TableHeaderColumn>
                    <TableHeaderColumn>Valor</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.renderRequetsList()}
                </TableBody>
              </Table>
            </BoxContent>
          </FlexContent>
        )}
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ market, userInfo }, props) => ({
  market,
  userInfo,
  props,
})

export default connect(mapStateToProps)(Home)