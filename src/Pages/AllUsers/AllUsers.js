import React from 'react'
import { connect } from 'react-redux'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { UserInfo } from './../../Services'
import { GetPersonalUserInfo } from './../../Store/Reducers/userInfo'
import { SetAllUsers, ResetAllUsers, SetSingleUser, ResetSingleUser } from './../../Store/Reducers/AllUsers'
import { EmptyContent, PersonalForm } from './../../components'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class UsersRows extends React.Component {
  viewSingleUserDetails = (user) => {
    this.props.dispatch(SetSingleUser(user))
    this.props.dispatch(GetPersonalUserInfo(user))
  }

  render() {
    return Object.values(this.props.users).map(user => {
      return (
        <TableRow onClick={() => this.viewSingleUserDetails(user)} key={user._id} className='striped--near-white'>
          <TableRowColumn>{user.nome}</TableRowColumn>
          <TableRowColumn>{user.cpf}</TableRowColumn>
          <TableRowColumn>{user.email}</TableRowColumn>
          <TableRowColumn>{user.phone}</TableRowColumn>
        </TableRow>
      )
    })
  }
}

class AllUsers extends React.Component {

  componentWillMount = () => {
    UserInfo.GetAllUser()
      .then(({ data }) => this.props.dispatch(SetAllUsers(data)))
  }

  componentWillUnmount = () => {
    this.props.dispatch(ResetAllUsers())
  }

  render() {
    const { usersDetails } = this.props
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3' title='Usuários Cadastrados'>
            {usersDetails.viewSingle._id ? (
              <PersonalForm isDisabled={true} />
            ) : usersDetails.all[0] ? (
              <Table selectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Nome</TableHeaderColumn>
                    <TableHeaderColumn>CPF</TableHeaderColumn>
                    <TableHeaderColumn>E-mail</TableHeaderColumn>
                    <TableHeaderColumn>Telefone</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <UsersRows dispatch={this.props.dispatch} users={usersDetails.all} />
                </TableBody>
              </Table>
            ) : (
                  <EmptyContent name='cliente' />
                )}
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ usersDetails }, props) => ({
  usersDetails,
  ...props,
})

export default connect(mapStateToProps)(AllUsers)
