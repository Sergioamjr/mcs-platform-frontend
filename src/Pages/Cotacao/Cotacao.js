import React from 'react'
import WrapperPage from './../../components/wrapper'
import BoxContent from './../../components/BoxContent'
import FlexContent from './../../components/FlexContent'
import FaSort from 'react-icons/lib/fa/sort'
import { FormatValues } from './../../utils'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import { ApiBitcoin } from './../../Services'
import { connect } from 'react-redux'
import _ from 'lodash'
import { TransformApiResponseToInteger, isNegative } from './../../utils'

class Cotacao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marketValues: [],
      asc: true,
    }
  }

  componentDidMount() {
    ApiBitcoin.getMarketValues()
      .then(({ data }) => data)
      .then(TransformApiResponseToInteger)
      .then(data => this.setState({ marketValues: data }))
  }

  changeOrderViewer = id => this.setState({
    marketValues: _.orderBy(this.state.marketValues, [id], [this.state.asc ? 'asc' : 'desc']),
    asc: !this.state.asc,
  })

  sortArrByName = () => this.changeOrderViewer('name')

  sortArrByPriceBrl = () => this.changeOrderViewer('price_usd')

  sortArrByPercentChange1h = () => this.changeOrderViewer('percent_change_1h')

  sortArrByPercentChange24h = () => this.changeOrderViewer('percent_change_24h')

  sortArrByPercentChange7d = () => this.changeOrderViewer('percent_change_7d')

  sortArrByPriceUsd = () => this.changeOrderViewer('price_usd')

  sortArrByRank = () => this.changeOrderViewer('rank')

  renderMarketValues() {
    const { marketValues } = this.state
    return marketValues.map(coin => (
      <TableRow key={coin.id} className='striped--near-white'>
        <TableRowColumn>{coin.name}</TableRowColumn>
        <TableRowColumn>{FormatValues(coin.price_usd)}</TableRowColumn>
        <TableRowColumn
          className={`${isNegative(coin.percent_change_1h)}`}
        >{coin.percent_change_1h}%
        </TableRowColumn>
        <TableRowColumn
          className={`${isNegative(coin.percent_change_24h)}`}
        >{coin.percent_change_24h}%
        </TableRowColumn>
        <TableRowColumn
          className={`${isNegative(coin.percent_change_7d)}`}
        >{coin.percent_change_7d}%
        </TableRowColumn>
        <TableRowColumn>{_.parseInt(coin.rank, 10)}º</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    return (
      <WrapperPage>
        <FlexContent>
          <BoxContent grid='w-100 pa3' title='Cotação'>
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn> <span role='button' tabIndex='0' className='b ttu pointer' onClick={this.sortArrByName}>Nome <FaSort /></span></TableHeaderColumn>
                  <TableHeaderColumn> <span role='button' tabIndex='5' className='b ttu pointer' onClick={this.sortArrByPriceUsd}>Valor em Dolar <FaSort /> </span></TableHeaderColumn>
                  <TableHeaderColumn> <span role='button' tabIndex='2' className='b ttu pointer' onClick={this.sortArrByPercentChange1h}>Última 1h <FaSort /> </span></TableHeaderColumn>
                  <TableHeaderColumn> <span role='button' tabIndex='3' className='b ttu pointer' onClick={this.sortArrByPercentChange24h}>Últimas 24h <FaSort /> </span></TableHeaderColumn>
                  <TableHeaderColumn> <span role='button' tabIndex='4' className='b ttu pointer' onClick={this.sortArrByPercentChange7d}>Últimos 7 dias <FaSort /> </span></TableHeaderColumn>
                  <TableHeaderColumn> <span role='button' tabIndex='6' className='b ttu pointer' onClick={this.sortArrByRank}>Ranking <FaSort /> </span></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.renderMarketValues()}
              </TableBody>
            </Table>
          </BoxContent>
        </FlexContent>
      </WrapperPage>
    )
  }
}

const mapStateToProps = ({ market }, props) => ({
  market,
  props,
})

export default connect(mapStateToProps)(Cotacao)
