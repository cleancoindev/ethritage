import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenOwnerOf extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.tokenId = this.props.tokenId || 0;
    this.dataKey = this.contracts.ethritageToken.methods.ownerOf.cacheCall(this.tokenId);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.ownerOf)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.ownerOf[this.dataKey].value
    
    return (
      <React.Fragment>
        {data}
      </React.Fragment>
    )
  }
}

TokenOwnerOf.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenOwnerOf;