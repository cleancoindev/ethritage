import React, { Component } from "react";
import { AccountData } from "drizzle-react-components";

import {
  BalanceOfTokenContainer,
  TotalSupplyContainer,
  TokenName,
  TokenSymbol,
  TokenURI,
  TokenOfOwnerByIndex,
  TokenByIndex,
  TokenOwnerOf,
  TokenIsMinter,
  TokenIsApprovedForAll,
  TokenGetApproved,
  BalanceOfAddress,
  TokenAddMinter,
  TokenApprove,
  TokenSetApprovalForAll,
  TokenMint,
  TokenMintWithURI,
  TokenTransferFrom,
  TokenSafeTransferFrom,
  TokenSafeTransferFromData,
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
          Token URI of Token (1): <TokenURI tokenId={1} />
          <br />
          TokenID of Owner by Index: (1) (address:
          0xC2cE5805dDCa2895497fF41c5f2eF5ef93BaeC43)
          <TokenOfOwnerByIndex
            address={"0xC2cE5805dDCa2895497fF41c5f2eF5ef93BaeC43"}
            tokenIndex={1}
          />
          <br />
          Token by Index (1): <TokenByIndex tokenIndex={1} />
          <br />
          Token Owner of TokenId(1): <TokenOwnerOf tokenId={1} />
          <br />
          Is This (address: 0x2ca4488037250f9453032aa8de9be5786c5c178b) Minter?{" "}
          <TokenIsMinter
            address={"0x2ca4488037250f9453032aa8de9be5786c5c178b"}
          />
          <br />
          Is this Operator Approved for all?{" "}
          <TokenIsApprovedForAll
            owner={"0x2ca4488037250f9453032aa8de9be5786c5c178b"}
            operator={"0xC2cE5805dDCa2895497fF41c5f2eF5ef93BaeC43"}
          />
          <br />
          GetWhoIsApproved tokenid(1): <TokenGetApproved tokenId={1} />
          <br />
          Get Balance of Address: (address:
          0x2ca4488037250f9453032aa8de9be5786c5c178b){" "}
          <BalanceOfAddress
            address={"0x2ca4488037250f9453032aa8de9be5786c5c178b"}
          />
          <br />
          <br />
          Adding A minter (0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69):{" "}
          <TokenAddMinter />
          <br />
          <br />
          <br />
          Approve Token: <TokenApprove />
          <br />
          <br />
          Set Approval For All: <TokenSetApprovalForAll />
          <br />
          <br />
          Mint Token: <TokenMint />
          <br />
          <br />
          Mint Token With URI: <br />
          <TokenMintWithURI />
          <br/>
          <br/>
          Token Transfer From: 
          <TokenTransferFrom/>
          <br />
          <br />
          Safe Transfer From: 
          <TokenSafeTransferFrom/>
          <br />
          <br />
          Safe Transfer From w/Data: 
          <TokenSafeTransferFromData/>
          <br />
          <br />
          safeTransferFrom, SafeTransferFromBytes, renounceMinter,
        </div>
      </main>
    );
  }
}

export default Home;
