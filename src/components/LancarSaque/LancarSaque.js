import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import NumberFormat from 'react-number-format'
import { DatePicker } from 'redux-form-material-ui'
import { reduxForm, Field } from 'redux-form'
import { UserInfo } from './../../Services'

const fieldInputValue = ({ input }) => (
  <NumberFormat
    className='mb3 mr3 db'
    fullWidth
    required
    customInput={TextField}
    thousandSeparator
    floatingLabelText='Valor a ser lançado'
    prefix='R$'
    {...input}
  />
)

fieldInputValue.propTypes = {
  input: PropTypes.object.isRequired,
}

class LancarSaque extends React.Component {

  handleChange = (search) => {
    const { updateSearch, resetSearch } = this.props
    const { target: { value } } = search
    if (value.length === 0) {
      resetSearch()
      this.nameInput.focus()
    } else {
      UserInfo.getUser(value)
        .then(({ data }) => data)
        .then(updateSearch)
        .then(() => this.nameInput.focus())
        .catch(error => console.log(error))
    }
  }

  renderSearchOptions = () => {
    const { searchOptions, userSelected, itemSelected } = this.props
    return searchOptions.items.map((item) => (
      <li
        onClick={() => itemSelected(item)}
        className={`pointer list pv2 ph1 bb b--light-gray ${userSelected === item.email ? 'bg-silver' : ''}`}
        key={item._id}>{item.nome} {item.sobrenome} - CPF {item.cpf}
      </li>
    ))
  }

  render() {
    const { handleSubmit, searchOptions, type } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <p className='mb3'>Pesquise o usuário a ser feito o lançamento do {type}.</p>
        <div className='mb4 pt3 pb3 flex flex-wrap'>
          <div className='w-100 w-50-ns ph3'>
            <Field name='value' id='value' component={fieldInputValue} type='text' />
          </div>
          <div className='w-100 w-50-ns ph3'>
            <Field name='data' fullWidth required floatingLabelText='Data de lançamento' component={DatePicker} format={(value) => value || null} />
          </div>
          <div className='w-100 ph3'>
            <TextField
              className='mb3 mr3 db'
              fullWidth
              ref={(input) => { this.nameInput = input }}
              onChange={this.handleChange}
              floatingLabelText='Nome do cliente'
            />
          </div>
          {searchOptions.show && (
            <div className='w-100 ph3'>
              {searchOptions && searchOptions.items.length > 0 ? (
                <div>
                  <p>Selecione o cliente a receber</p><br />
                  <ul className=''>
                    {this.renderSearchOptions()}
                  </ul>
                </div>
              ) : <p>Nenhum cliente encontrado.</p>}
            </div>
          )}
        </div>

        <RaisedButton label={`Lançar ${type}`} type='submit' primary />
      </form>
    )
  }
}

fieldInputValue.propTypes = {
  updateSearch: PropTypes.array,
  resetSearch: PropTypes.array,
}

export default reduxForm({ form: 'myForm' })(LancarSaque)
