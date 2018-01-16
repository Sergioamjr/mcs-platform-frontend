import React from 'react'
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o'
import FaClose from 'react-icons/lib/fa/close'
import FaClockO from 'react-icons/lib/fa/clock-o'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import { SetUserHistory } from './../../Store/Reducers/userInfo'
import { FormatData, FormatValues, showToastr } from './../../utils'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { Request } from './../../Services'

class ClientsRequests extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    Request.GetAllRequest()
      .then(({ data }) => dispatch(SetUserHistory(data)))
  }

  handleApprove = (item, type) => {
    Request.UpdateRequest({ ...item, status: type }, 'put')
      .then(() => showToastr('Atualizado com sucesso.', 'success'))
      .then(() => Request.GetAllRequest()
        .then(({ data }) => this.props.dispatch(SetUserHistory(data)))
      )
  }


  renderUserHistory = () => {
    const { userInfo: { history } } = this.props
    return history.map(item => {
      return (
        <TableRow key={item._id} className='striped--near-white'>
          <TableRowColumn>{FormatData(item.date)}</TableRowColumn>
          <TableRowColumn>{item.userName}</TableRowColumn>
          <TableRowColumn>{item.action}</TableRowColumn>
          <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
          <TableRowColumn>{item.status || ''}</TableRowColumn>
          <TableRowColumn>
            <FaCheckSquareO onClick={() => this.handleApprove(item, 'APROVADO')} className='btn f3 btn-primary pointer mr2 bg-green pa1 c-white' />
            <FaClockO onClick={() => this.handleApprove(item, 'PENDENTE')} className='btn mr2 btn-primary pointer bg-gray pa1 f3 c-white' />
            <FaClose onClick={() => this.handleApprove(item, 'NEGADO')} className='btn btn-primary pointer bg-red pa1 f3 c-white' />
          </TableRowColumn>
        </TableRow>
      )
    })
  }


  render() {
    const { userInfo: { history } } = this.props
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 maa pa3' title='Solicitações de clientes'>
            {history.length > 0 ? (
              <Table selectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Data</TableHeaderColumn>
                    <TableHeaderColumn>Cliente</TableHeaderColumn>
                    <TableHeaderColumn>Ação</TableHeaderColumn>
                    <TableHeaderColumn>Valor</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.renderUserHistory()}
                </TableBody>
              </Table>
            ) : <p className='pa3 tc'>Sem histórico de lançamento ainda.</p>}
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ userInfo }, props) => ({
  userInfo,
  ...props,
})

export default connect(mapStateToProps)(ClientsRequests)
