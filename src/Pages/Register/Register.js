import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link, withRouter } from 'react-router-dom'
import FormLogin from './../../components/FormLogin'
import toastr from 'toastr'
import { Auth } from './../../Services'
import { fetchUser } from './../../Store/Reducers/Auth'

class SignupForm extends React.Component {

  handleSubmit = ({ nome: name, email, password, repassword }) => {
    const { dispatch, history } = this.props
    if (!name || !email || !password || !repassword) {
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
        .catch(() => toastr.error('E-mail ou Senha inválidos.'))
    }
  }

  render() {
    return (
      <div className='w-100 h-100vh bg-silver'>
        <div className='fw4 pa4 ph3'>
          <h1>MCS Intermedicações</h1>
          <FormLogin register onSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ signup }, props) => ({
  signup,
  ...props,
})

export default connect(mapStateToProps)(withRouter(SignupForm))
