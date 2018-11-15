import React, { Component } from "react";
import PropTypes from "prop-types";

//import styles from "./styles.css";

class TokenAddMinter extends Component {
  constructor(props, context) {
    super(props);
    this.drizzleStatus = this.props.drizzleStatus;
    this.contracts = context.drizzle.contracts;

    this.state = {
      value: "demostuff"
    };
    this.stackId = 0;
    this.txHash = "";
  }

  handleChange = (event) =>{
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('An essay was submitted: ' + this.state.value);
    event.preventDefault();

    if (this.drizzleStatus.initialized) {
      const stackId = this.contracts.ethritageToken.methods.addMinter.cacheSend(
        this.state.value
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
        <label>
          MinterAddress:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        Transanction Hash: {this.txHash}
      </form>

    );
  }
}

TokenAddMinter.contextTypes = {
  drizzle: PropTypes.object
};

export default TokenAddMinter;
