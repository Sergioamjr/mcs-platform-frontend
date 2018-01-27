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
import { Request, Payments } from './../../Services'
import { GetUserRequests, GetUserPayments, SetUserHistory } from './../../Store/Reducers/userInfo'
import { FormatValues, FormatData, IsValueFrozen } from './../../utils'

class Home extends React.Component {
  componentDidMount = () => {
    const { dispatch, auth: { isAdmin, user: { email } } } = this.props

    const QueryPayments = isAdmin ? Payments.GetAllPayments() : Payments.getUserPayments(email)
    const QueryRequests = isAdmin ? Request.GetAllRequest() : Request.getUserRequests(email)

    QueryPayments
      .then((data) => {
        dispatch(GetUserPayments(data))
        dispatch(SetUserHistory(data))
      })

    QueryRequests
      .then(({ data }) => dispatch(GetUserRequests(data)))
  }

  renderRequetsList = (items, status = 'pedidos', isAdmin) => (
    items.slice(0, 5).map(item => (
      <TableRow key={item._id} className='striped--near-white'>
        <TableRowColumn>{FormatData(item.date || item.data)}</TableRowColumn>
        {isAdmin && <TableRowColumn>{item.userName}</TableRowColumn>}
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
    )
  )

  render() {
    const { userInfo: { payments, requests, history }, auth: { isAdmin } } = this.props
    return (
      <WrapperPage>
        {(payments && !isAdmin) && (
          <ResumeAmount {...payments} />
        )}
        <FlexContent>
          <BoxContent grid='w-100 pa3' title='Últimos Pedidos'>
            {requests.length > 0 ? (
              <Table selectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Data</TableHeaderColumn>
                    {isAdmin && <TableHeaderColumn>Cliente</TableHeaderColumn>}
                    <TableHeaderColumn>Ação</TableHeaderColumn>
                    <TableHeaderColumn>Valor</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.renderRequetsList(requests, '', isAdmin)}
                </TableBody>
              </Table>
            ) : (
              <EmptyContent name='pedido' />
            )}
          </BoxContent>

          <BoxContent grid='w-100 pa3' title='Últimos lançamentos'>
            {history[0] ? (
              <Table selectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Data</TableHeaderColumn>
                    {isAdmin && <TableHeaderColumn>Cliente</TableHeaderColumn>}
                    <TableHeaderColumn>Ação</TableHeaderColumn>
                    <TableHeaderColumn>Valor</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.renderRequetsList(history, 'history', isAdmin)}
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
