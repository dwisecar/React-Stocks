import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolioStocks: [],
    filter: 'All',
    sort: 'None'
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch('http://localhost:3000/stocks').then(res => res.json()).then(data => this.setState({stocks: data}))
  }

  handleStockClick = (stock) => {
    this.setState((prevState => ({
      portfolioStocks: [...prevState.portfolioStocks, stock]
    })))
  }

  handleRemoveStock = stock => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(s => s.id !== stock.id)
    })
  }

  handleFilter = e => {
    this.setState({
      type: e.target.value
    })
  }

  handleSort = e => {
    this.setState({
      sort: e.target.value
    })
  }

  renderStocks = () => {
    let stocks = this.state.stocks
    if(this.state.type !== 'All') {stocks = stocks.filter(stock => stock.type === this.state.type)}

    switch (this.state.sort) {
      case 'Alphabetically':
        return stocks.sort((a,b) => a.name > b.name ? 1 : -1)
      case 'Price':
        return stocks.sort((a,b) => a.proce > b.price ? 1 : -1)
      default:
        return stocks
        break;
    }
  }


  render() {
    let stocksToRender = this.renderStocks()
    
    return (
      <div>
        <SearchBar handleFilter={this.handleFilter} handleSort={this.handleSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={stocksToRender} handleStockClick={this.handleStockClick}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} handleRemoveStock={this.handleRemoveStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
