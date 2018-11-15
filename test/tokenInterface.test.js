"use strict";

const assert = require("assert");
const uuidv4 = require("uuid/v4");
const TokenInterface = require("../server/erc721-Interface");

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";
const wsServer = "ws://localhost:7545";
const networkId = 5777;

const ganacheAccountZero = "0x2ca4488037250f9453032aa8de9be5786c5c178b";

describe("tokenInterface", () => {
  //Accessible for all the tests
  let tokenId;
  let tokenURI;

  let mintedtokens = {};

  const gas = {
    price: 20 * 1e8,
    limit: 2100000
  };

  const keypair = require('../secrets');

  const contractInstance = {
    contractBuild: require("../build/contracts/ethritageToken"),
    contractABI: require("../build/contracts/ethritageToken").abi,
    contractAddress: require("../build/contracts/ethritageToken").networks[networkId]
      .address
  };

  const web3Plus = {
    Web3,
    HDWalletProvider,
    Tx,
    server,
    wsServer
  };

  const tokenInterface = new TokenInterface(
    gas,
    keypair,
    contractInstance,
    web3Plus
  );

  beforeEach(async () => {
    // let events = await tokenInterface.subscribeToAllEvents();
    // events('newBlockHeaders', (error, blockHeader) => {
    //   if (error) console.log(error)
    //   console.log("Here is blockheader", blockHeader);
    // })
  });

  it("Should mint a token...", async () => {
    tokenURI = uuidv4();

    let events = await tokenInterface.subscribeToContractEvents();
    events.Transfer(
      {
        fromBlock: 0
      },
      function(error, event) {
        if (error) {
          console.log(error);
          assert.equal(event.event, "Transfer");
        }

        tokenId = event.returnValues.tokenId;

        assert.equal(event.event, "Transfer");
      }
    );

    const result = await tokenInterface.mintToken(tokenURI);
  }).timeout(5000);

  it("Should return a Token URI...", async () => {
    let response = await tokenInterface.tokenURI(tokenId);

    assert.equal(tokenURI, response);
  });

  it("Should return token of owner by index...", async () => {
    let ownedTokens = [];
    const address = ganacheAccountZero;
    const index = 0;
    let tokensOwned = await tokenInterface.balanceOf(address);

    let success = true;

    for (let x = 0; x < tokensOwned; x++) {
      ownedTokens.push(await tokenInterface.tokenOfOwnerByIndex(address, x));
    }

    for (let x = 0; x < ownedTokens.length; x++) {
      let owner = await tokenInterface.ownerOf(ownedTokens[x]);
      if (owner.toLowerCase() !== address) {
        success = false;
      }
    }

    assert.ok(success);
  });

  xit("Should return the symbol 'tt'...", async () => {
    let response = await tokenInterface.symbol();
    assert.equal(response, "tt");
  });

  xit("Should respond false for supporting uknown interface...", async () => {
    const code = "0x032";
    let response = await tokenInterface.supportsInterFace(code);
    assert.ok(!response);
  });

  xit("Should respond with the owner address...", async () => {
    const expectedAddress = ganacheAccountZero;
    const token = 645;
    let response = await tokenInterface.ownerOf(token);
    assert.equal(response.toLowerCase(), expectedAddress);
  });

  xit("Should respond with the token Name...", async () => {
    const expectedName = "testToken";
    let response = await tokenInterface.name();
    assert.equal(response, expectedName);
  });

  xit("Should return status of isMinter for an address...", async () => {
    const address = ganacheAccountZero;
    let response = await tokenInterface.isMinter(address);
    assert.ok(response);
  });

  xit("Should return false for an unaproved isApprovedForAll operator...", async () => {
    const addressOwner = ganacheAccountZero;
    const addressOperator = "0xBc8a2A1Cb9a192bDb2A167d4d1807F4895d1C65B";
    let response = await tokenInterface.isApprovedForAll(
      addressOwner,
      addressOperator
    );
    assert.ok(!response);
  });

  xit("Should return no one is approved for getApproved...", async () => {
    const tokenId = 645;
    const nullAddress = "0x0000000000000000000000000000000000000000";
    let response = await tokenInterface.getApproved(tokenId);
    assert.equal(response, nullAddress);
  });

  xit("Should return the balance of an address...", async () => {
    const address = ganacheAccountZero;
    let response = await tokenInterface.balanceOf(address);
    assert.ok(response);
  });

  xit("Should Transfer a token from and address to an address...", async () => {
    const addressFrom = ganacheAccountZero;
    const addressTo = "0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69";
    const tokenID = 5;

    let response = await tokenInterface.transferFrom(
      addressFrom,
      addressTo,
      tokenID
    );
    //console.log("Response: ", response);
    assert.equal(response.logs[0].type, "mined");
  });

  xit("Should approve the transfer of all tokens...", async () => {
    const addressTo = "0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69";
    const approval = true;

    let response = await tokenInterface.setApprovalForAll(addressTo, approval);
    //console.log("Response: ", response);
    assert.equal(response.logs[0].type, "mined");
  });

  xit("Should safeTransfer a token from and address to an address...", async () => {
    const addressFrom = ganacheAccountZero;
    const addressTo = "0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69";
    const tokenID = 809;

    let response = await tokenInterface.safeTransferFrom(
      addressFrom,
      addressTo,
      tokenID
    );
    //console.log("Response: ", response);
    assert.equal(response.logs[0].type, "mined");
  });

  xit("Renounce Minter...");

  // it('Should add a minter', async (done) => {
  //     const result = await tokenInterface.addMinter("0x85A7bAC4da4Bc90820339759E73bee84D1D28c3E");
  //     setTimeout(done, 4500);
  //     assert.ok(result);
  // })
});
