import React, { Component } from 'react'
import AppRouter from './Router/'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Reducers from './Store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DefaultStore from './Store/DefaultStore'
import './App.css'
// import './tachyons.css'
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(Reducers, DefaultStore, reduxDevTools, applyMiddleware(thunk), )

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className='App'>
            <AppRouter />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
