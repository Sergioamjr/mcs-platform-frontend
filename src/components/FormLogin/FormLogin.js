import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Link, withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import toastr from 'toastr'
import { updatePassword, updateEmail, ResetLogin } from './../../Store/Reducers/Login'
import { Auth } from './../../Services'
import { fetchUser } from './../../Store/Reducers/Auth'

class FormLogin extends React.Component {

  changeEmail = v => this.props.dispatch(updateEmail(v.target.value))

  changePassword = v => this.props.dispatch(updatePassword(v.target.value))

  handleSubmit = (e) => {
    const { login, dispatch, history } = this.props
    const { email, password } = login
    Auth.loginSubmit({ email, password })
      .then(({ data }) => data)
      .then(data => dispatch(fetchUser(data)))
      .then(() => history.push('/inicio'))
      .catch(() => toastr.error('E-mail ou Senha inválidos.'))
      .finally(() => dispatch(ResetLogin()))
    e.preventDefault()
  }

  render() {
    return (
      <form className='tl w-m-400 maa bg-white pa3' onSubmit={this.handleSubmit}>
        <h2>Por Favor, faça login.</h2>
        <div>
          <TextField
            className='mb3 mr3 db'
            fullWidth
            onChange={this.changeEmail}
            floatingLabelText='Email'
          />
        </div>
        <div className='mb3'>
          <TextField
            className='mb3 mr3 db'
            type='password'
            fullWidth
            onChange={this.changePassword}
            floatingLabelText='Sua Senha'
          />
        </div>
        <div className='flex justify-between'>
          <RaisedButton label='Enviar' type='submit' primary />
          <Link to='/registro'>Criar conta</Link>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ login }, props) => ({
  login,
  ...props,
})

export default connect(mapStateToProps)(withRouter(FormLogin))
