import React, { Component } from 'react'

class BoxContent extends Component {
  render() {
    const { grid, title, children } = this.props
    return (
      <div className={`${grid} pa3`}>
        {title && (
          <div className='header-box bg-dark'>
            <h2 className='f4 pa3 c-white fw5 tl lh-solid'>{title}</h2>
          </div>
        )}
        <div className='bg-white tl br--bottom br2'>
          { children }
        </div>
      </div>
    )
  }
}

export default BoxContent
