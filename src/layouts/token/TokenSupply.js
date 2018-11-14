import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenSupply extends Component {
  constructor(props, context) {
      console.log("Context is: ", context);
      
    super(props);
    this.contracts = context.drizzle.contracts;
    console.log("Contracts are: ", this.contracts);
    console.log("props is: ", this.props);
    this.dataKey = this.contracts.ethritageToken.methods.balanceOf.cacheCall(this.props.accounts[0]);
  }

  //ethritageToken.methods[""balanceOf(address)""].cacheCall

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

TokenSupply.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenSupply;