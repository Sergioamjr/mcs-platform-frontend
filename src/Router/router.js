import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  DadosPessoais,
  Historico,
  Pedidos,
  Simular,
  Lancamento,
  Home,
  // Cotacao,
  Login,
  AllUsers,
  ClientsRequests,
  Register,
} from './../Pages'
import { isValidToken, fetchUser, isUserAdmin } from './../Store/Reducers/Auth'
import { Auth, UserInfo } from './../Services'

const NotLogged = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/registro' component={Register} />
    <Redirect to='/' />
  </Switch>
)

const UserLogged = () => (
  <Switch>
    <Route exact path='/inicio' component={Home} />
    <Route exact path='/pedidos' component={Pedidos} />
    <Route exact path='/historico' component={Historico} />
    <Route exact path='/simular' component={Simular} />
    <Route exact path='/dados-pessoais' component={DadosPessoais} />
    <Redirect to='/inicio' />
  </Switch>
)

const UserAdmin = () => (
  <Switch>
    <Route exact path='/inicio' component={Home} />
    <Route exact path='/lancamento' component={Lancamento} />
    <Route exact path='/pedidos' component={Pedidos} />
    <Route exact path='/pedidos-dos-clientes' component={ClientsRequests} />
    <Route exact path='/historico' component={Historico} />
    <Route exact path='/simular' component={Simular} />
    <Route exact path='/dados-pessoais' component={DadosPessoais} />
    <Route exact path='/clientes' component={AllUsers} />
    {/* <Route exact path='/cotacao' component={Cotacao} /> */}
    <Redirect to='/inicio' />
  </Switch>
)

class AppRouter extends React.Component {
  componentDidMount() {
    const getStorage = JSON.parse(localStorage.getItem('_mcs_auth'))
    if (getStorage) {
      const { token, email } = getStorage
      const { dispatch } = this.props
      axios.defaults.headers.common['authorization'] = token
      Auth.validateToken(token)
        .then(({data}) => {
          dispatch(isValidToken(data.valid))
          return data.valid
        })
        .then(() => UserInfo.isAdmin(email)
          .then(({ isAdmin }) => dispatch(isUserAdmin(isAdmin))))
        .then(bool => {
          if(bool) {
            dispatch(fetchUser(getStorage))
          }
        })
    }
  }

  render() {
    const { auth: { user, validToken, isAdmin } } = this.props
    const isLogged = user !== null && validToken !== false
    const Admin = user ? isAdmin : false
    if (isLogged && !Admin) {
      axios.defaults.headers.common['authorization'] = user.token
      return(
        <Router>
          <UserLogged />
        </Router>
      )
    } else if (isLogged && Admin) {
      axios.defaults.headers.common['authorization'] = user.token
      return(
        <Router>
          <UserAdmin />
        </Router>
      )
    } else if (!isLogged) {
      return(
        <Router>
          <NotLogged />
        </Router>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ auth }, props) => {
  return {
    auth,
    ...props,
  }
}

export default connect(mapStateToProps)(AppRouter)
