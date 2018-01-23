import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import FormLogin from './../../components/FormLogin'
import { Auth, UserInfo } from './../../Services'
import { showToastr } from './../../utils'
import { fetchUser, isUserAdmin } from './../../Store/Reducers/Auth'

class Login extends React.Component {
  handleSubmit = ({ email, password }) => {
    const { history } = this.props
    Auth.loginSubmit({ email, password })
      .then(({ data }) => this.props.fetchUser(data))
      .then(() => UserInfo.isAdmin(email)
        .then(({ isAdmin }) => this.props.isUserAdmin(isAdmin)))
      .then(() => history.push('/inicio'))
      .catch(error => {
        if (error.response) {
          showToastr(error.response.data, 'error')
        }
      })
  }

  render() {
    return (
      <div className='w-100 h-100vh bg-silver'>
        <div className='fw4 pa4 ph3'>
          <h1>MCS Intermedicações</h1>
          <FormLogin onSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUser, isUserAdmin,
}, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(Login))
