import React from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { SolicitarSaque } from './../../components/SolicitarSaque'
import { InformarDeposito } from './../../components/InformarDeposito'
import { SetUserViewer } from './../../Store/Reducers/userViewer'
import { updateRequest, resetRequest, updateValue } from './../../Store/Reducers/Request'
import { Request } from './../../Services'

class Pedidos extends React.Component {
  setMenuViewerSaque = () => {
    this.props.dispatch(SetUserViewer('saque'))
  }

  setMenuViewerDeposito = () => {
    this.props.dispatch(SetUserViewer('deposito'))
  }

  updateRequestStore = values => this.props.dispatch(updateRequest(values))
  resetRequestStore = () => this.props.dispatch(resetRequest())
  handleChangeValue = value => this.props.dispatch(updateValue(value.floatValue))

  userRequestSubmit = () => {
    const { request } = this.props
    if (request.value > 0) {
      Request.userRequest(request)
        .then(() => toastr.success('Solicitação feita com sucesso.'))
        .catch(() => toastr.error('Não foi possível fazer a solicitação.'))
    } else {
      toastr.error('Por favor, preecha o valor.')
    }
  }

  render() {
    const { userViewer } = this.props
    const { actived } = userViewer
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3'>
            <nav className='bg-dark'>
              <ul>
                <li
                  onClick={this.setMenuViewerSaque}
                  className={`${actived === 'saque' ? 'bg-white' : 'c-white'} dib pa3 f4 pa3 tl lh-solid c-dark pointer`}>Solicitar Saque</li>
                <li
                  onClick={this.setMenuViewerDeposito}
                  className={`${actived === 'deposito' ? 'bg-white' : 'c-white'} dib pa3 f4 pa3 tl lh-solid c-dark pointer`}>Informar depósito</li>
              </ul>
            </nav>
            { actived === 'saque' && <SolicitarSaque
              resetRequestStore={this.resetRequestStore}
              onSubmit={this.userRequestSubmit}
              updateRequestStore={this.updateRequestStore}
              handleChangeValue={this.handleChangeValue}
              actived={actived}
            /> }
            { actived === 'deposito' && <InformarDeposito
              resetRequestStore={this.resetRequestStore}
              onSubmit={this.userRequestSubmit}
              updateRequestStore={this.updateRequestStore}
              handleChangeValue={this.handleChangeValue}
              actived={actived}
            /> }
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ userViewer, request }, props) => ({
  userViewer,
  request,
  ...props,
})

export default connect(mapStateToProps)(Pedidos)
