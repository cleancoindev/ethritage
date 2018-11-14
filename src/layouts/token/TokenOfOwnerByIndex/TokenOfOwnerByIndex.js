import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenOfOwnerByIndex extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.tokenIndex = this.props.tokenIndex || 0;
    this.addressOwnerToken = this.props.address || this.props.accounts[0];
    this.dataKey = this.contracts.ethritageToken.methods.tokenOfOwnerByIndex.cacheCall(this.addressOwnerToken, this.tokenIndex);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.tokenOfOwnerByIndex)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.tokenOfOwnerByIndex[this.dataKey].value
    
    return (
      <React.Fragment>
        {data}
      </React.Fragment>
    )
  }
}

TokenOfOwnerByIndex.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenOfOwnerByIndex;