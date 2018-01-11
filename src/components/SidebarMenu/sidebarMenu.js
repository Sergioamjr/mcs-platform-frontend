import React from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import './sidebar.css'

// Icones
import FaHome from 'react-icons/lib/fa/home'
import MdFormatAlignCenter from 'react-icons/lib/md/format-align-center'
import FaUserfrom from 'react-icons/lib/fa/user'
import MdInsertChart from 'react-icons/lib/md/insert-chart'
import MdToday from 'react-icons/lib/md/today'
import MdAttachMoney from 'react-icons/lib/md/attach-money'
import MdContentPaste from 'react-icons/lib/md/content-paste'

export default class DrawerSimpleExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const { classes } = this.props
    const style = { color: '#fff', textAlign: 'left' }
    return (
      <div className={`${classes} sidebar bg-dark fixed left0-m`}>
        <div className='top-logo-area c-white tl bg-theme-dark'>MCS Intermedicações</div>
        <Menu>
          <MenuItem className='menu-item' style={style} leftIcon={<FaHome style={style} />} containerElement={<Link to='/inicio' />} primaryText='Início' />
          <MenuItem className='menu-item' style={style} leftIcon={<MdContentPaste style={style} />} containerElement={<Link to='/lancamento' />} primaryText='Lançamentos' />
          <MenuItem className='menu-item' style={style} leftIcon={<MdAttachMoney style={style} />} containerElement={<Link to='/pedidos' />} primaryText='Pedidos' />
          <MenuItem className='menu-item' style={style} leftIcon={<MdToday style={style} />} containerElement={<Link to='/simular' />} primaryText='Simular Investimento' />
          <MenuItem className='menu-item' style={style} leftIcon={<MdFormatAlignCenter style={style} />} containerElement={<Link to='/historico' />} primaryText='Histórico' />
          <MenuItem className='menu-item' style={style} leftIcon={<FaUserfrom style={style} />} containerElement={<Link to='/dados-pessoais' />} primaryText='Dados Pessoais' />
          <MenuItem className='menu-item' style={style} leftIcon={<MdInsertChart style={style} />} containerElement={<Link to='/cotacao' />} primaryText='Cotação' />
        </Menu>
      </div>
    )
  }
}
