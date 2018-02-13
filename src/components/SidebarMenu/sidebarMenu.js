import React from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FaHome from 'react-icons/lib/fa/home'
import MdFormatAlignCenter from 'react-icons/lib/md/format-align-center'
import FaUserfrom from 'react-icons/lib/fa/user'
import MdInsertChart from 'react-icons/lib/md/insert-chart'
import MdToday from 'react-icons/lib/md/today'
import MdAttachMoney from 'react-icons/lib/md/attach-money'
import MdContentPaste from 'react-icons/lib/md/content-paste'
import FaArrowCircleOLeft from 'react-icons/lib/fa/arrow-circle-o-left'
import FaGroup from 'react-icons/lib/fa/group'
import { isValidToken } from './../../Store/Reducers/Auth'
import './sidebar.css'

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleLoggout = () => {
    this.props.dispatch(isValidToken(false))
    this.props.dispatch({ type: 'USER_LOGOUT' })
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const { classes, auth } = this.props
    const { isAdmin } = auth
    const style = { color: '#fff', textAlign: 'left' }
    return (
      <div className={`${classes} sidebar bg-dark fixed left0-m`}>
        <div className='top-logo-area c-white tl bg-theme-dark'>MCS Intermedicações</div>
        <Menu>
          <MenuItem className='menu-item' style={style} leftIcon={<FaHome style={style} />} containerElement={<Link to='/inicio' />} primaryText='Início' />
          {isAdmin && (
            <MenuItem className='menu-item' style={style} leftIcon={<MdContentPaste style={style} />} containerElement={<Link to='/lancamento' />} primaryText='Lançamentos' />
          )}
          {isAdmin && (
            <MenuItem className='menu-item' style={style} leftIcon={<MdAttachMoney style={style} />} containerElement={<Link to='/pedidos-dos-clientes' />} primaryText='Pedidos de clientes' />
          )}
          {!isAdmin && (
            <MenuItem className='menu-item' style={style} leftIcon={<MdAttachMoney style={style} />} containerElement={<Link to='/pedidos' />} primaryText='Pedidos' />
          )}
          <MenuItem className='menu-item' style={style} leftIcon={<MdToday style={style} />} containerElement={<Link to='/simular' />} primaryText='Simular Investimento' />
          {!isAdmin && (
            <MenuItem className='menu-item' style={style} leftIcon={<MdFormatAlignCenter style={style} />} containerElement={<Link to='/historico' />} primaryText='Histórico' />
          )}
          {isAdmin && (
            <MenuItem className='menu-item' style={style} leftIcon={<FaGroup style={style} />} containerElement={<Link to='/clientes' />} primaryText='Clientes Cadastrados' />
          )}
          <MenuItem className='menu-item' style={style} leftIcon={<FaUserfrom style={style} />} containerElement={<Link to='/dados-pessoais' />} primaryText='Dados Pessoais' />
          {false && (
            <MenuItem className='menu-item' style={style} leftIcon={<MdInsertChart style={style} />} containerElement={<Link to='/cotacao' />} primaryText='Cotação' />
          )}
          <MenuItem onClick={this.handleLoggout} className='menu-item' style={style} leftIcon={<FaArrowCircleOLeft style={style} />} primaryText='Sair' />
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }, props) => {
  return {
    auth,
    ...props,
  }
}

export default connect(mapStateToProps)(SidebarMenu)
