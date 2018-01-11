import React from 'react'
import WrapperPage from './../../components/wrapper'
import TextField from 'material-ui/TextField'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import RaisedButton from 'material-ui/RaisedButton'
import NumberFormat from 'react-number-format';
import { FormatValues } from './../../utils'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

export default class Simular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rend: {},
      value: 0,
      time: 0,
    }
  }
  handleSubmit = (e) => {
    let { value: total } = this.state
    const { time, rend } = this.state
    const obj = {}
    let rendimento = 0
    for (let i = 1; i <= time; i += 1) {
      obj[i] = {
        mes: i,
        total,
        rendimento,
        add: rend[i] ? rend[i].add : 0,
      }

      rendimento = ((total / 100) * 10) + obj[i].add
      total = parseInt(rendimento, 10) + parseInt(total, 10)
    }
    this.setState({ rend: obj })
    if (e) e.preventDefault()
  }

  updateValue = (e, key) => {
    if (isNaN(e.floatValue)) {
      e.floatValue = 0
    }
    const { rend } = this.state
    const newObj = Object.assign({}, rend)
    newObj[key].add = e.floatValue
    this.setState({ rend: newObj })
    this.handleSubmit(null)
  }

  handleValueChange = e => this.setState({ value: parseInt(e.value, 10) })
  handleTimeChange = e => this.setState({ time: parseInt(e.value, 10) })

  renderListRend = () => Object.entries(this.state.rend).map(([key, rend]) => (
    <TableRow key={key} className='striped--near-white'>
      <TableRowColumn>{rend.mes}º</TableRowColumn>
      <TableRowColumn>{FormatValues(rend.total)}</TableRowColumn>
      <TableRowColumn>{FormatValues(rend.rendimento)}</TableRowColumn>
      <TableRowColumn>
        <NumberFormat
          className='mr4'
          id={`id-${key}`}
          customInput={TextField}
          thousandSeparator
          allowNegative={false}
          onValueChange={e => this.updateValue(e, key)}
          value={rend.add}
          prefix='R$'
        />
      </TableRowColumn>
    </TableRow>
  ))


  render() {
    const { rend } = this.state
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3 maa mw7' title='Simular Investimento'>
            <form method='post' onSubmit={this.handleSubmit} className='pa3 pt0'>
              <NumberFormat
                onValueChange={this.handleValueChange}
                className='mr4'
                customInput={TextField}
                thousandSeparator
                floatingLabelText='Valor de investimento mensal'
                prefix='R$'
              />

              <NumberFormat
                customInput={TextField}
                onValueChange={this.handleTimeChange}
                className='mr4'
                floatingLabelText='Tempo de Rendimento' />
              <RaisedButton type='submit' label='Calcular' primary />
            </form>
            {rend[1] && (

              <Table selectable={false}>
                <TableHeader
                  displaySelectAll={false}
                  enableSelectAll={false}
                  adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn> <span className='b ttu pointer'>Mês</span></TableHeaderColumn>
                    <TableHeaderColumn> <span className='b ttu pointer'>Total</span></TableHeaderColumn>
                    <TableHeaderColumn> <span className='b ttu pointer'>Rendimento</span></TableHeaderColumn>
                    <TableHeaderColumn> <span className='b ttu pointer'>Investimento adicional</span></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.renderListRend()}
                </TableBody>
              </Table>
            )}
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}
