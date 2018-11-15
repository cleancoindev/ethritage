import React, { Component } from "react";
import PropTypes from "prop-types";

//import styles from "./styles.css";

class TokenApprove extends Component {
  constructor(props, context) {
    super(props);
    this.drizzleStatus = this.props.drizzleStatus;
    this.contracts = context.drizzle.contracts;

    this.state = {
      value: "demostuff",
      address: "0x0",
      tokenId: "0",
    };
    this.stackId = 0;
    this.txHash = "";
  }

  handleChange = (event) =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    console.log('approve submited: ',  this.state.address, " tokenId ", this.state.tokenId);
    event.preventDefault();

    if (this.drizzleStatus.initialized) {
      const stackId = this.contracts.ethritageToken.methods.approve.cacheSend(
        this.state.address, this.state.tokenId
      );
      console.log("StackID is: ", stackId);
      console.log("TrasnactionSTack: ", this.props.state.transactionStack[stackId]);
      this.stackId = stackId;
      
    }
  }
  render() {
    // If the data isn't here yet, show loading
    // if(!(this.dataKey in this.props.ethritage.addMinter)) {
    //   return (
    //     <span>Loading...</span>
    //   )
    // }


    
    if (this.props.state.transactionStack[this.stackId]) {
      this.txHash = this.props.state.transactionStack[this.stackId];
      // console.log("Transaction Hash: ", this.txHash);
      // console.log("State tx Status: ", this.props.state.transactions[this.txHash].status);
      // console.log("This txStatus: ", this.props.state.transactions[this.txHash]);
    }

    // If the data is here, get it and display it
    //var data = this.props.ethritage.addMinter[this.dataKey].value

    return (
      <form onSubmit={this.handleSubmit}>
      <br/>
        <label>
          Address:
          <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
        </label><br/>
        <label>
          TokenId:
          <input type="text" name="tokenId" value={this.state.tokenId} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        Transanction Hash: {this.txHash}
      </form>

    );
  }
}

TokenApprove.contextTypes = {
  drizzle: PropTypes.object
};

export default TokenApprove;
