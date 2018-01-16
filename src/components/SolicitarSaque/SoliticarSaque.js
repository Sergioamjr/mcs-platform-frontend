import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { FormatValues } from './../../utils'

class SolicitarSaque extends Component {
  componentDidMount() {
    const { user: { email, name } } = this.props.auth
    const obj = {
      email,
      date: new Date(),
      userName: name,
      action: 'SAQUE',
      value: 0,
    }

    this.props.updateRequestStore(obj)
  }

  componentWillUnmount() {
    this.props.resetRequestStore()
  }

  render() {
    const { userInfo: { payments } } = this.props
    return (
      <div className='items-center fw4 pa4 ph3'>
        <p className='mb3'>Informe quanto você gostaria de receber.</p>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Saldo Atual</TableHeaderColumn>
              <TableHeaderColumn>Disponível para saque</TableHeaderColumn>
              <TableHeaderColumn>Investimento</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow className='striped--near-white'>
              <TableRowColumn>{FormatValues(payments.totalAmount) || FormatValues(0)}</TableRowColumn>
              <TableRowColumn>{FormatValues(payments.rendimento) || FormatValues(0)}</TableRowColumn>
              <TableRowColumn>{FormatValues(payments.investimento) || FormatValues(0)}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        <NumberFormat
          className='mb3 mr3 db'
          customInput={TextField}
          thousandSeparator
          required
          onValueChange={e => this.props.handleChangeValue(e)}
          allowNegative={false}
          floatingLabelText='Valor'
          prefix='R$'
        />
        <span className='db mb3 c-gray f7'>
          Tempo de repasse: 3 dias valores até {FormatValues(payments.rendimento) || FormatValues(0)} e 30 dias até {FormatValues(payments.investimento) || FormatValues(0)}.</span>
        <RaisedButton onClick={this.props.onSubmit} type='submit' label='Solicitar Saque' primary />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, userInfo }, props) => ({
  auth,
  userInfo,
  ...props,
})

export default connect(mapStateToProps)(SolicitarSaque)
