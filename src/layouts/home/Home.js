import React, { Component } from 'react'
import { AccountData } from 'drizzle-react-components'

import {BalanceOfTokenContainer, TotalSupplyContainer, TokenName, TokenSymbol} from '../token/index';

class Home extends Component {
  render() {


    return (
      <main className="container">
        <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
            Total Token Supply: <TotalSupplyContainer/><br/>
           Balance of User: <BalanceOfTokenContainer/><br/>
           Token Name: <TokenName/><br/>
           Token Symbol: <TokenSymbol/>
            <br/><br/>
          </div>
      </main>
    )
  }
}

export default Home
