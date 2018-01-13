import React from 'react'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SetUserViewer } from './../../Store/Reducers/userViewer'
import { LancarSaque } from './../../components'
import { updateSearch, resetSearch } from './../../Store/Reducers/Search'
import { UserInfo } from './../../Services'
import { submitForm, incrementUser, updateType, resetForm } from './../../Store/Reducers/Lancamento'
import toastr from 'toastr'
class Saque extends React.Component {

  setViewerAndType = (id = 'saque') => {
    this.props.resetForm()
    this.props.resetSearch()
    this.props.SetUserViewer(id)
    this.props.updateType(id.toUpperCase())
  }

  setLancamentoViewSaque = () => this.setViewerAndType()

  setLancamentoViewDeposito = () => this.setViewerAndType('investimento')

  setLancamentoViewRendimento = () => this.setViewerAndType('rendimento')

  itemSelected = ({ nome, sobrenome, email }) => this.props.incrementUser({ userName: `${nome} ${sobrenome}`, email })

  handleSubmit = values => {
    this.props.submitForm(values)
    setTimeout(() => {
      UserInfo.throwPayment(this.props.lancamento)
        .then(() => this.setViewerAndType(this.props.userViewer.actived))
        .then(() => toastr.success('Lançamento salvo com sucesso.'))
        .catch(() => toastr.error('Não foi possível fazer o lançamento.'))
    }, 500);
  }

  componentDidMount() {
    this.setViewerAndType()
  }

  render() {
    const { userViewer, updateSearch, search, lancamento } = this.props
    const { actived } = userViewer
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3'>
            <nav className='bg-dark'>
              <ul>
                <li
                  onClick={this.setLancamentoViewSaque}
                  className={`${actived === 'saque' ? 'bg-white' : 'c-white'} dib pa3 f4 pa3 tl lh-solid c-dark pointer`}>Lançar Saque</li>
                <li
                  onClick={this.setLancamentoViewRendimento}
                  className={`${actived === 'rendimento' ? 'bg-white' : 'c-white'} dib pa3 f4 pa3 tl lh-solid c-dark pointer`}>Lançar Rendimento</li>
                <li
                  onClick={this.setLancamentoViewDeposito}
                  className={`${actived === 'investimento' ? 'bg-white' : 'c-white'} dib pa3 f4 pa3 tl lh-solid c-dark pointer`}>Lançar Depósito</li>
              </ul>
            </nav>
            <div className='items-center fw4 pa4 ph3'>
              {actived === 'saque' && <LancarSaque
                updateSearch={updateSearch}
                itemSelected={this.itemSelected}
                searchOptions={search}
                type='saque'
                userSelected={lancamento.userId}
                resetSearch={this.setViewerAndType}
                onSubmit={this.handleSubmit}
              />}
              {actived === 'rendimento' && <LancarSaque
                updateSearch={updateSearch}
                itemSelected={this.itemSelected}
                searchOptions={search}
                type='rendimento'
                userSelected={lancamento.userId}
                resetSearch={this.setViewerAndType}
                onSubmit={this.handleSubmit}
              />}
              {actived === 'investimento' && <LancarSaque
                updateSearch={updateSearch}
                itemSelected={this.itemSelected}
                searchOptions={search}
                type='investimento'
                userSelected={lancamento.userId}
                resetSearch={this.setViewerAndType}
                onSubmit={this.handleSubmit}
              />}
            </div>
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ userViewer, search, lancamento }, props) => ({
  userViewer,
  lancamento,
  search,
  props,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  submitForm, SetUserViewer, updateSearch, incrementUser, updateType, resetForm, resetSearch,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Saque)
