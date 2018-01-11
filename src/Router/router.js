import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

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


export default class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/registro' component={Register} />
          <Route path='/inicio' component={Home} />
          <Route path='/lancamento' component={Lancamento} />
          <Route path='/pedidos' component={Pedidos} />
          <Route path='/historico' component={Historico} />
          <Route path='/simular' component={Simular} />
          <Route path='/dados-pessoais' component={DadosPessoais} />
          <Route path='/cotacao' component={Cotacao} />
        </div>
      </Router>
    )
  }
}
