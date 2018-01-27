import React from 'react'
import FaClose from 'react-icons/lib/fa/close'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import { SetPayments } from './../../Store/Reducers/Payments'
import { FormatData, FormatValues, showToastr } from './../../utils'
import { Payments } from './../../Services'

class AllPayments extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    Payments.GetAllPayments()
      .then(data => dispatch(SetPayments(data)))
  }

  handleDelete = (item) => {
    Payments.DeletePayment(item._id)
      .then(() => showToastr('Lançamento excluído com sucesso.', 'success'))
      .then(() => Payments.GetAllPayments()
        .then(data => this.props.dispatch(SetPayments(data))))
  }


  renderUsersPayments = () => {
    const { payments } = this.props
    return Object.values(payments.payments).map(item => {
      return (
        <TableRow key={item._id} className='striped--near-white'>
          <TableRowColumn>{FormatData(item.data)}</TableRowColumn>
          <TableRowColumn>{item.userName}</TableRowColumn>
          <TableRowColumn>{item.tipo}</TableRowColumn>
          <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
          <TableRowColumn>
            <FaClose onClick={() => this.handleDelete(item)} className='btn btn-primary pointer bg-red pa1 f3 c-white' />
          </TableRowColumn>
        </TableRow>
      )
    })
  }


  render() {
    const { payments } = this.props
    return (
      <div>
        {payments.payments[0] ? (
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Data</TableHeaderColumn>
                <TableHeaderColumn>Cliente</TableHeaderColumn>
                <TableHeaderColumn>Ação</TableHeaderColumn>
                <TableHeaderColumn>Valor</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderUsersPayments()}
            </TableBody>
          </Table>
        ) : <p className='pa3 tc'>Sem histórico de lançamento ainda.</p>}
      </div>
    )
  }
}

const mapStateToProps = ({ payments }, props) => ({
  payments,
  ...props,
})

export default connect(mapStateToProps)(AllPayments)
