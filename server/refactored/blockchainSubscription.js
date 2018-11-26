

const eventLog = [];
function blockchainSubscription(events, block) {
  events.Transfer({
    fromBlock: block
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    eventLog.push(event);
    let tokenId = event.returnValues.tokenId;
    //console.log("The Event for Token: ", event.event);
    console.log("The Event for Transfer: ", event.blockNumber);
    console.log("The Token id: ", tokenId);
  });
  events.Approval({
    fromBlock: block
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    //let tokenId = event.returnValues.tokenId;
    eventLog.push(event);
    console.log("The Event for Approval: ", event);
  });
  events.ApprovalForAll({
    fromBlock: block
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    //let tokenId = event.returnValues.tokenId;
    eventLog.push(event);
    console.log("The Event for ApprovalForAll: ", event);
  });
  events.MinterAdded({
    fromBlock: block
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    //let tokenId = event.returnValues.tokenId;
    eventLog.push(event);
    console.log("The Event for MinterAdded: ", event);
  });
  events.MinterRemoved({
    fromBlock: block
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    //let tokenId = event.returnValues.tokenId;
    eventLog.push(event);
    console.log("The Event for MinterRemoved: ", event);
  });
}
exports.blockchainSubscription = blockchainSubscription;