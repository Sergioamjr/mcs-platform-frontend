import React from 'react'
import SidebarMenu from './../SidebarMenu'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import MdMenu from 'react-icons/lib/md/menu'
import Header from './../Header'

class WrapperPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
    }
  }

  toggleMenu = () => this.setState({ openMenu: !this.state.openMenu })

  render() {
    const { children } = this.props
    const { openMenu } = this.state
    return (
      <div>
        <div className='flex justify-end'>
          <SidebarMenu classes={`${openMenu ? 'left0' : ''}`} />
          <div className={`${openMenu ? 'dark-screen' : ''} w-100 w-100-safe-ms h-100vh overflow-y-scroll bg-silver`}>
            <Header />
            <div className='pa3'>
              {children}
            </div>
            {(window.matchMedia('(max-width: 992px)').matches) && (
              <FloatingActionButton className='fixed-menu' onClick={this.toggleMenu}>
                <MdMenu />
              </FloatingActionButton>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default WrapperPage
