import React from 'react'
import { connect } from 'react-redux'
import './Header.css'

class Header extends React.Component {

  render() {
    const { auth: { user: { name }}} = this.props
    return(
      <header className='tr bg-theme tl c-white'>
        Olá, {name}
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
