import React from 'react'
import { connect } from 'react-redux'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { PersonalForm } from './../../components'
import { UserInfo } from './../../Services'
import { showToastr } from './../../utils'
import { GetPersonalUserInfo } from './../../Store/Reducers/userInfo'

class DadosPessoais extends React.Component {
  componentDidMount() {
    const { user: { email } } = this.props.auth
    UserInfo.getUserByEmail(email)
      .then(response => this.props.dispatch(GetPersonalUserInfo(response)))
  }

  submit = (values) => {
    const Request = values._id ? UserInfo.updateUser(values) : UserInfo.createUser(values)
    Request
      .then(e => console.log('success', e))
      .catch(({ response }) => showToastr(response))
  }

  render() {
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3 maa mw7' title='Informações da conta'>
            <PersonalForm onSubmit={this.submit} />
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ signup, userInfo, auth }, props) => ({
  signup,
  userInfo,
  auth,
  ...props,
})

export default connect(mapStateToProps)(DadosPessoais)
