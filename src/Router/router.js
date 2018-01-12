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
  Cotacao,
  Login,
  Register,
} from './../Pages'
import { isValidToken, fetchUser } from './../Store/Reducers/Auth'
import { Auth } from './../Services'

const NotLogged = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/registro' component={Register} />
    <Redirect to="/"/>
  </Switch>
)

const UserLogged = () => (
  <Switch>
    <Route exact path='/inicio' component={Home} />
    <Route exact path='/lancamento' component={Lancamento} />
    <Route exact path='/pedidos' component={Pedidos} />
    <Route exact path='/historico' component={Historico} />
    <Route exact path='/simular' component={Simular} />
    <Route exact path='/dados-pessoais' component={DadosPessoais} />
    <Route exact path='/cotacao' component={Cotacao} />
    <Redirect to="/inicio"/>
  </Switch>
)

class AppRouter extends React.Component {
  componentDidMount() {
    const getStorage = JSON.parse(localStorage.getItem('_mymoney_user'))
    if(getStorage) {
      const { token } = getStorage
      const { dispatch } = this.props
      Auth.validateToken(token)
        .then(({data}) => {
          dispatch(isValidToken(data.valid))
          return data.valid
        })
        .then(bool => {
          if(bool) {
            dispatch(fetchUser(getStorage))
          }
        })
    }
  }

  render() {
    const { auth: { user, validToken } } = this.props
    const isLogged = user !== null && validToken !== false
    console.log(this.props.auth.user)
    if(isLogged) {
      Auth.validateToken(user.token)
      axios.defaults.headers.common['authorization'] = user.token
      return(
        <Router>
          <UserLogged />
        </Router>
      )
    } else {
      return(
        <Router>
          <NotLogged />
        </Router>
      )
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
