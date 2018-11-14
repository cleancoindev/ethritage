import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import styles from "./styles.css";

class TokenByIndex extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.tokenIndex = this.props.tokenIndex || 0;
    this.dataKey = this.contracts.ethritageToken.methods.tokenByIndex.cacheCall(this.tokenIndex);
  }


  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.ethritage.tokenByIndex)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.tokenByIndex[this.dataKey].value
    
    return (
      <React.Fragment>
        {data}
      </React.Fragment>
    )
  }
}

TokenByIndex.contextTypes = {
  drizzle: PropTypes.object
}

export default TokenByIndex;