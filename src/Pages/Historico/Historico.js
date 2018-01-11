import React from 'react'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import { SetUserHistory } from './../../Store/Reducers/userInfo'
import { FormatData, FormatValues, IsValueFrozen } from './../../utils'
import { UserInfo } from './../../Services'

class Historico extends React.Component {
  componentDidMount() {
    const { dispatch, auth } = this.props
    UserInfo.getUserID(auth.user.email)
      .then(({ data }) => UserInfo.getUserInfo(data.userId)
        .then(response => dispatch(SetUserHistory(response))))
  }

  renderUserHistory = () => {
    const { userInfo: { history }} = this.props
    return history.map(item => {
      return (
      <TableRow key={item._id} className='striped--near-white'>
        <TableRowColumn>{FormatData(item.data)}</TableRowColumn>
        <TableRowColumn>{item.tipo}</TableRowColumn>
        <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
        <TableRowColumn>{IsValueFrozen(item.data, item.tipo) ? 'Congelado' : ''}</TableRowColumn>
      </TableRow>
      )
    })
  }


  render() {
    console.log(this.props.userInfo)
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 maa pa3' title='Histórico'>
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Data</TableHeaderColumn>
                  <TableHeaderColumn>Ação</TableHeaderColumn>
                  <TableHeaderColumn>Valor</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.renderUserHistory()}
              </TableBody>
            </Table>
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ userInfo, auth }, props) => ({
  userInfo,
  auth,
  ...props,
})

export default connect(mapStateToProps)(Historico)
