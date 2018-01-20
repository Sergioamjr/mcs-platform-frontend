import React from 'react'
import { connect } from 'react-redux'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { UserInfo } from './../../Services'
import { SetAllUsers, ResetAllUsers } from './../../Store/Reducers/AllUsers/AllUsers'
import { EmptyContent } from './../../components'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class AllUsers extends React.Component {

  componentWillMount = () => {
    UserInfo.GetAllUser()
      .then(({ data }) => this.props.dispatch(SetAllUsers(data)))
  }

  componentWillUnmount = () => {
    this.props.dispatch(ResetAllUsers())
  }

  renderUsersRows = () => {
    const { allUsers } = this.props
    console.log(Object.values(allUsers))

    return Object.values(allUsers).map(user => {
      return (
        <TableRow key={user._id} className='striped--near-white'>
          <TableRowColumn>{`${user.nome} ${user.sobrenome}`}</TableRowColumn>
          <TableRowColumn>{user.cpf}</TableRowColumn>
          <TableRowColumn>{user.email}</TableRowColumn>
          <TableRowColumn>{user.phone}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    const { allUsers } = this.props
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3' title='Usuários Cadastrados'>
            {allUsers[0] ? (
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
                  {this.renderUsersRows()}
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

const mapStateToProps = ({ allUsers }, props) => ({
  allUsers,
  ...props,
})

export default connect(mapStateToProps)(AllUsers)
