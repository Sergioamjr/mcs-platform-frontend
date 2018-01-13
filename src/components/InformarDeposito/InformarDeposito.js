import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'

class InformarDeposito extends Component {
  componentDidMount() {
    const { user: { email, name } } = this.props.auth
    const obj = {
      email,
      date: new Date(),
      userName: name,
      action: 'INVESTIMENTO',
      value: 0,
    }

    this.props.updateRequestStore(obj)
  }

  componentWillUnmount() {
    this.props.resetRequestStore()
  }

  render() {
    return (
      <div className='items-center fw4 pa4 ph3'>
        <p className='mb3'>Informe o valor que você depositou.</p>
        <form>
          <NumberFormat
            className='mb3 mr3 db'
            customInput={TextField}
            thousandSeparator
            allowNegative={false}
            onValueChange={e => this.props.handleChangeValue(e)}
            floatingLabelText='Valor depositado'
            prefix='R$'
          />
          <RaisedButton onClick={this.props.onSubmit} label='Enviar' primary />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }, props) => ({
  auth,
  ...props,
})

export default connect(mapStateToProps)(InformarDeposito)
