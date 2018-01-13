import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { updatePassword, updateEmail, updateName, updateRepassword } from './../../Store/Reducers/Signup'
import { Auth } from './../../Services'
import toastr from 'toastr'

class SignupForm extends React.Component {

  changeEmail = v => this.props.dispatch(updateEmail(v.target.value))
  changeName = v => this.props.dispatch(updateName(v.target.value))
  changeRepassword = v => this.props.dispatch(updateRepassword(v.target.value))
  changePassword = v => this.props.dispatch(updatePassword(v.target.value))

  handleSubmit = (e) => {
    const { signup } = this.props
    const { name, email, password, repassword } = signup
    Auth.signupSubmit({ name, email, password, repassword })
      .then(response => console.log('response', response))
      .catch(data => toastr.error('E-mail ou Senha inválidos.'))
    e.preventDefault()
  }

  render() {
    return (
      <form className='tl w-m-400 maa bg-white pa3' onSubmit={this.handleSubmit}>
        <p>Se registre.</p>
        <div>
          <TextField
            className='mb3 mr3 db'
            fullWidth
            onChange={this.changeName}
            floatingLabelText='Seu nome'
          />
        </div>
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
        <div className='mb3'>
          <TextField
            className='mb3 mr3 db'
            type='password'
            fullWidth
            onChange={this.changeRepassword}
            floatingLabelText='Confirme sua Senha'
          />
        </div>
        <div className='flex justify-between'>
          <RaisedButton label='Enviar' type='submit' primary />
          <RaisedButton label='Criar conta' />
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ signup }, props) => ({
  signup,
  ...props,
})

export default connect(mapStateToProps)(SignupForm)
