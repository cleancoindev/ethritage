import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenIsApprovedForAll extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.addressOwner = this.props.owner || "0x0";
    this.addressOperator = this.props.operator || "0x0";
    this.dataKey = this.contracts.ethritageToken.methods.isApprovedForAll.cacheCall(this.addressOwner, this.addressOperator);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.isApprovedForAll)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.isApprovedForAll[this.dataKey].value
    
    return (
      <React.Fragment>
        {data}
      </React.Fragment>
    )
  }
}

TokenIsApprovedForAll.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenIsApprovedForAll;