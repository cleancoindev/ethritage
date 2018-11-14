import React, { Component } from "react";
import PropTypes from "prop-types";

//import styles from "./styles.css";

class TokenName extends Component {
  constructor(props, context) {

    super(props);
    this.contracts = context.drizzle.contracts;

    this.dataKey = this.contracts.ethritageToken.methods.name.cacheCall();
  }

  //ethritageToken.methods[""name(address)""].cacheCall

  render() {
    // If the data isn't here yet, show loading
    if (!(this.dataKey in this.props.ethritage.name)) {
      return <span>Loading...</span>;
    }

    // If the data is here, get it and display it
    var data = this.props.ethritage.name[this.dataKey].value;

    return <React.Fragment>{data}</React.Fragment>;
  }
}

TokenName.contextTypes = {
  drizzle: PropTypes.object
};

export default TokenName;
