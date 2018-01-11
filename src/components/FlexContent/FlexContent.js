import React, { Component } from 'react'

class FlexContent extends Component {
  render() {
    return (
      <div className='flex flex-wrap justify-between mb3'>
        {this.props.children}
      </div>
    )
  }
}
export default FlexContent
