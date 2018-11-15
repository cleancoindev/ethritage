import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenAddMinter extends Component {
  constructor(props, context) {
    super(props);
    this.drizzleStatus = this.props.drizzleStatus;
    this.contracts = context.drizzle.contracts;
    this.minterAddress = this.props.minterAddress || 0;
    this.dataKey = {},
    this.txStatus = {},
    this.state = this.props.state
  }


  render() {
    // If the data isn't here yet, show loading
    // if(!(this.dataKey in this.props.ethritage.addMinter)) {
    //   return (
    //     <span>Loading...</span>
    //   )
    // }

    const addMinter = () => {
          
    if(this.drizzleStatus.initialized){

      const stackId = this.contracts.ethritageToken.methods.addMinter.cacheSend(this.minterAddress);
      if (this.state.transactionStack[stackId]) {
        const txHash = this.state.transactionStack[stackId]
        this.setState({txStatus: txHash});
        return this.state.transactions[txHash].status
      }
    }
  }

    // If the data is here, get it and display it
    //var data = this.props.ethritage.addMinter[this.dataKey].value
    
    return (
      <React.Fragment>
        {this.state.txStatus}
      </React.Fragment>
    )
  }
}

TokenAddMinter.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenAddMinter;