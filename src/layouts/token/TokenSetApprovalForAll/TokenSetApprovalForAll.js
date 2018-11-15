import React, { Component } from "react";
import PropTypes from "prop-types";

//import styles from "./styles.css";

class TokenSetApprovalForAll extends Component {
  constructor(props, context) {
    super(props);
    this.drizzleStatus = this.props.drizzleStatus;
    this.contracts = context.drizzle.contracts;

    this.state = {
      address: "0x0",
      bool: true,
    };
    this.stackId = 0;
    this.txHash = "";
  }

  handleChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    console.log('approve submited: ',  this.state.address, " tokenId ", this.state.bool);
    event.preventDefault();

    if (this.drizzleStatus.initialized) {
      const stackId = this.contracts.ethritageToken.methods.setApprovalForAll.cacheSend(
        this.state.address, this.state.bool
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
        <input
            name="bool"
            type="checkbox"
            checked={this.state.bool}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        Transanction Hash: {this.txHash}
      </form>

    );
  }
}

TokenSetApprovalForAll.contextTypes = {
  drizzle: PropTypes.object
};

export default TokenSetApprovalForAll;
