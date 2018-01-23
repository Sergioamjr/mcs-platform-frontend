import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import { ResumeAmount } from './../../components'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { Request, UserInfo } from './../../Services'
import { GetUserRequests, GetUserPayments } from './../../Store/Reducers/userInfo'
import { FormatValues, FormatData } from './../../utils'
// import { getUserInfo } from './../../Store/Reducers/'

class Home extends React.Component {
  componentDidMount = () => {
    const { dispatch, auth } = this.props
    UserInfo.getUserInfo(auth.user.email)
      .then((data) => dispatch(GetUserPayments(data)))
      .catch(err => console.log('error', err))
    Request.getUserRequests(auth.user.email)
      .then(({ data }) => dispatch(GetUserRequests(data)))
      .catch(err => console.log('error', err))
  }

  renderRequetsList = () => {
    const { userInfo: { requests } } = this.props
    return requests.map((item) => {
      return (
        <TableRow key={item._id} className='striped--near-white'>
          <TableRowColumn>{FormatData(item.date)}</TableRowColumn>
          <TableRowColumn>{item.action}</TableRowColumn>
          <TableRowColumn>{FormatValues(item.value)}</TableRowColumn>
          <TableRowColumn>{item.status ? item.status : 'PENDENTE'}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    const { userInfo: { payments } } = this.props
    return (
      <WrapperPage>
        {payments && (
          <ResumeAmount {...payments} />
        )}
        {this.props.userInfo.requests.length > 0 && (
          <FlexContent>
            <BoxContent grid='w-100 pa3' title='Pedidos'>
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
                  {this.renderRequetsList()}
                </TableBody>
              </Table>
            </BoxContent>
          </FlexContent>
        )}
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ market, userInfo, auth }, props) => ({
  market,
  userInfo,
  auth,
  ...props,
})

export default connect(mapStateToProps)(Home)
