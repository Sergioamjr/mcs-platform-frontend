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
import { ResumeAmount, EmptyContent } from './../../components'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { Request, UserInfo } from './../../Services'
import { GetUserRequests, GetUserPayments, SetUserHistory } from './../../Store/Reducers/userInfo'
import { FormatValues, FormatData, IsValueFrozen } from './../../utils'
// import { getUserInfo } from './../../Store/Reducers/'

class Home extends React.Component {
  componentDidMount = () => {
    const { dispatch, auth } = this.props
    UserInfo.getUserInfo(auth.user.email)
      .then(data => dispatch(GetUserPayments(data)))
      .then(() => Request.getUserRequests(auth.user.email)
        .then(({ data }) => dispatch(GetUserRequests(data))))
      .then(() => UserInfo.getUserInfo(auth.user.email)
        .then(data => dispatch(SetUserHistory(data))))
  }

  renderRequetsList = (items, status = 'pedidos') => {
    return items.map((item) => {
      return (
        <TableRow key={item._id} className='striped--near-white'>
          <TableRowColumn>{FormatData(item.date || item.data)}</TableRowColumn>
          <TableRowColumn>{item.action || item.tipo}</TableRowColumn>
          <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
          <TableRowColumn>{
            status === 'history' ?
              IsValueFrozen(item.data, item.tipo) ?
                'CONGELADO' :
                'LIBERADO' :
                item.status ?
                  item.status :
                  'PENDENTE'}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    const { userInfo: { payments, requests, history } } = this.props
    console.log(this.props.userInfo)
    return (
      <WrapperPage>
        {payments && (
          <ResumeAmount {...payments} />
        )}
        <FlexContent>
          <BoxContent grid='w-100 pa3' title='Últimos Pedidos'>
            {requests.length > 0 ? (
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
                  {this.renderRequetsList(requests)}
                </TableBody>
              </Table>
            ) : (
              <EmptyContent name='pedido' />
            )}
          </BoxContent>

          <BoxContent grid='w-100 pa3' title='Histórico de lançamentos'>
            {history ? (
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
                  {this.renderRequetsList(history, 'history')}
                </TableBody>
              </Table>
            ) : (
              <EmptyContent name='histórico' />
            )}
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ market, userInfo, auth }, props) => ({
  market,
  userInfo,
  auth,
  ...props,
})

export default connect(mapStateToProps)(Home)
