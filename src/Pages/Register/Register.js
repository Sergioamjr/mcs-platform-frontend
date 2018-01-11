import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link, withRouter } from 'react-router-dom'
import toastr from 'toastr'
import { updatePassword, updateEmail, updateName, updateRepassword } from './../../Store/Reducers/Signup'
import { Auth } from './../../Services'
import { fetchUser } from './../../Store/Reducers/Auth'

class SignupForm extends React.Component {
  changeEmail = v => this.props.dispatch(updateEmail(v.target.value))
  changeName = v => this.props.dispatch(updateName(v.target.value))
  changeRepassword = v => this.props.dispatch(updateRepassword(v.target.value))
  changePassword = v => this.props.dispatch(updatePassword(v.target.value))

  handleSubmit = (e) => {
    const { signup, dispatch, history } = this.props
    const {
      name, email, password, repassword,
    } = signup
    if (name === null || email === null || password === null || repassword === null) {
      toastr.error('Preencha todos os dados.')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toastr.error('Digite um E-mail válido.')
    } else if (password !== repassword) {
      toastr.error('Senhas não conferem.')
    } else {
      Auth.signupSubmit({
        name, email, password, repassword,
      })
      .then(({ data }) => data)
      .then(data => dispatch(fetchUser(data)))
      .then(() => history.push('/inicio'))
        .catch(data => toastr.error('E-mail ou Senha inválidos.'))
    }
    e.preventDefault()
  }

  render() {
    return (
      <div className='w-100 h-100vh bg-silver'>
        <div className='fw4 pa4 ph3'>
          <form className='tl w-m-400 maa bg-white pa3' onSubmit={this.handleSubmit}>
            <h2>Crie sua conta</h2>
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
              <Link to='/'>Fazer login</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ signup }, props) => ({
  signup,
  props,
})

export default connect(mapStateToProps)(withRouter(SignupForm))
