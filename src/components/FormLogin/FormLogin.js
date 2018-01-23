import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'

class FormLogin extends React.Component {

  render() {
    const { register, handleSubmit } = this.props
    return (
      <form method='post' className='tl w-m-400 maa bg-white pa3' onSubmit={handleSubmit}>
        <h2>{register ? 'Criar conta' : 'Fazer login'}</h2>
        {
          register && (
            <div>
              <Field
                className='mb3 mr3 db'
                fullWidth
                floatingLabelText='Seu nome'
                id='nome'
                name='nome'
                component={TextField}
                type='text'
              />
            </div>
          )
        }
        <div>
          <Field
            className='mb3 mr3 db'
            fullWidth
            floatingLabelText='E-mail'
            id='email'
            name='email'
            component={TextField}
            type='text'
          />
        </div>
        <div className='mb3'>
          <Field
            className='mb3 mr3 db'
            fullWidth
            floatingLabelText='Password'
            id='password'
            name='password'
            component={TextField}
            type='password'
          />
        </div>
        {
          register && (
            <div className='mb3'>
              <Field
                className='mb3 mr3 db'
                fullWidth
                floatingLabelText='Confirme sua senha'
                id='repassword'
                name='repassword'
                component={TextField}
                type='password'
              />
            </div>
          )
        }
        <div className='flex justify-between'>
          <RaisedButton label='Enviar' type='submit' primary />
          <Link to={register ? '/login' : '/registro'}>{register ? 'Fazer login' : 'Criar conta'}</Link>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: 'login' })(FormLogin)
