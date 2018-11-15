import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class BalanceOfAddress extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.address = this.props.address || "0x0";
    this.dataKey = this.contracts.ethritageToken.methods.balanceOf.cacheCall(this.address);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.balanceOf)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.balanceOf[this.dataKey].value
    
    return (
      <React.Fragment>
        {data}
      </React.Fragment>
    )
  }
}

BalanceOfAddress.contextTypes = {
  drizzle: PropTypes.object
}

export default BalanceOfAddress;