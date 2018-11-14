import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenGetApproved extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.tokenId = this.props.tokenId || 0;
    this.dataKey = this.contracts.ethritageToken.methods.getApproved.cacheCall(this.tokenId);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.getApproved)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.getApproved[this.dataKey].value
    
    return (
      <React.Fragment>
        {data}
      </React.Fragment>
    )
  }
}

TokenGetApproved.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenGetApproved;