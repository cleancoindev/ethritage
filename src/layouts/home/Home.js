import React, { Component } from "react";
import { AccountData } from "drizzle-react-components";

import {
  BalanceOfTokenContainer,
  TotalSupplyContainer,
  TokenName,
  TokenSymbol,
  TokenURI,
  TokenOfOwnerByIndex,
  TokenByIndex
} from "../token/index";

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-u-1-1">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />
          Total Token Supply: <TotalSupplyContainer />
          <br />
          Balance of User: <BalanceOfTokenContainer />
          <br />
          Token Name: <TokenName />
          <br />
          Token Symbol: <TokenSymbol />
          <br />
          Token URI of Token 1: <TokenURI tokenId={1} />
          <br />
          TokenID of Owner by Index:{" "}
          <TokenOfOwnerByIndex
            address={"0xC2cE5805dDCa2895497fF41c5f2eF5ef93BaeC43"}
            tokenIndex={1}
          /><br/>
          Token by Index: <TokenByIndex tokenIndex={1}/>
          <br />
          <br />
        </div>
      </main>
    );
  }
}

export default Home;
