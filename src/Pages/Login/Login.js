import React from 'react'
import FormLogin from './../../components/FormLogin'
// eca@gmail.com
class Login extends React.Component {

  render() {
    return (
      <div className='w-100 h-100vh bg-silver'>
        <div className='fw4 pa4 ph3'>
          <h1>MCS Intermedicações</h1>
          <FormLogin />
        </div>
      </div>
    )
  }
}

export default Login
