import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import { isValidToken } from './../../Store/Reducers/Auth'
import './Header.css'

class Header extends React.Component {
  handleClick = () => this.props.dispatch(isValidToken(false))

  render() {
    const { auth: { user: { name }}} = this.props
    return(
      <header className='tr bg-theme tl c-white'>
        Olá, {name} - <RaisedButton onClick={this.handleClick} label='Sair' />
      </header>
    )
  }
}

const mapStateToProps = ({ auth }, props) => {
  return {
    auth,
    ...props
  }
}

export default connect(mapStateToProps)(Header)
