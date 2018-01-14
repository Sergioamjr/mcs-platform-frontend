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
import { SetUserpayments, GetUserPayments } from './../../Store/Reducers/userInfo'
import { FormatData, FormatValues, showToastr } from './../../utils'
import { Payments } from './../../Services'

class AllPayments extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    Payments.GetAllPayments()
      // .then(({ data }) => dispatch(GetUserPayments(data)))
  }

  handleDelete = (item) => {
    console.log(item)
    // Payments.DeletePayment(item._id)
    //   .then(() => showToastr('Atualizado com sucesso.', 'success'))
    //   .then(() => Request.GetAllRequest()
    //     .then(({ data }) => this.props.dispatch(SetUserpayments(data)))
    //   )
  }


  renderUsersPayments = () => {
    const { userInfo: { payments } } = this.props
    console.log(payments)
    return payments.map(item => {
      return (
        <TableRow key={item._id} className='striped--near-white'>
          <TableRowColumn>{FormatData(item.date)}</TableRowColumn>
          <TableRowColumn>{item.userName}</TableRowColumn>
          <TableRowColumn>{item.action}</TableRowColumn>
          <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
          <TableRowColumn>
            <FaClose onClick={() => this.handleDelete(item)} className='btn btn-primary pointer bg-red pa1 f3 c-white' />
          </TableRowColumn>
        </TableRow>
      )
    })
  }


  render() {
    const { userInfo: { payments } } = this.props
    return (
      <div>
        {payments.length > 0 ? (
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

const mapStateToProps = ({ userInfo }, props) => ({
  userInfo,
  ...props,
})

export default connect(mapStateToProps)(AllPayments)
