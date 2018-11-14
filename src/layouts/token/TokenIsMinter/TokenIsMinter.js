import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenIsMinter extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.address = this.props.address || 0;
    this.dataKey = this.contracts.ethritageToken.methods.isMinter.cacheCall(this.address);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.isMinter)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.isMinter[this.dataKey].value
    
    return (
      <React.Fragment>
        {data ? "True" : "False"}
      </React.Fragment>
    )
  }
}

TokenIsMinter.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenIsMinter;