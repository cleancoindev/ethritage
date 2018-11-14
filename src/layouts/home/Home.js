import React, { Component } from 'react'
import { AccountData } from 'drizzle-react-components'
import logo from '../../logo.png'
import {BalanceOfTokenContainer} from '../token/index';

class Home extends Component {
  render() {
    //console.log("The props: ", this.props);
    const { ethritage } = this.props;
    //console.log("Ethritage: ", ethritage);

    return (
      <main className="container">
        <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
           <BalanceOfTokenContainer/>
            <br/><br/>
          </div>
      </main>
    )
  }
}

export default Home
