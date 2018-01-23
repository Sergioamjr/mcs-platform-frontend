import React from 'react'
import { connect } from 'react-redux'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { PersonalForm } from './../../components'
import { UserInfo } from './../../Services'
import { showToastr } from './../../utils'
import { GetPersonalUserInfo, SetUserStorageData } from './../../Store/Reducers/userInfo'

class DadosPessoais extends React.Component {
  componentDidMount() {
    const { user: { email, name: nome } } = this.props.auth
    UserInfo.getUserByEmail(email)
      .then(response => this.props.dispatch(GetPersonalUserInfo(response)))
      .then(() => this.props.dispatch(SetUserStorageData({ email, nome })))
  }

  submit = (values) => {
    const Request = values._id ? UserInfo.updateUser(values) : UserInfo.createUser(values)
    Request
      .then(() => showToastr('Atualizado com sucesso.', 'success'))
      .catch(error => {
        if (error.response) {
          showToastr(error.response.data, 'error')
        }
      })
  }

  render() {
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3 maa' title='Informações da conta'>
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
