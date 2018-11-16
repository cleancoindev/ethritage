import React, { Component } from "react";
import PropTypes from "prop-types";

//import styles from "./styles.css";

class ListAllTokens extends Component {
  constructor(props, context) {
    console.log("Context is: ", context);

    super(props);
    this.token = context.drizzle.contracts.ethritageToken.methods;
    console.log("Contracts are: ", this.contracts);
    console.log("props is: ", this.props);
    
    this.totalSupply = 0;
    this.URIlist = [];
    this.data = 0
  }

  componentDidMount() {
    this.getTotalSupply();
    this.subscribe();
  }

  getTotalSupply = async () => {

      try {
        const supply = await this.token.totalSupply().call();
        const tempArray = [];
        console.log("Totally Supply is: ", supply);
        this.totalSupply = supply;
        for(let x = 2; x<supply; x++){
          tempArray.push(this.getURI(x));
        }
        console.log("TempArray: ", tempArray);
        //const promises = tempArray.map(tempArray);
        let newArray = await Promise.all(tempArray);
        this.URIlist = newArray;
        console.log("New Array is: ", newArray);
        console.log("This Urilist: ", this.URIlist);
      } catch(error){
        console.log(error)
      }
  }

  getURI = async (tokenID) => {

      let uri = await this.token.tokenURI(tokenID).call();
      console.log(`The URI of TokenID ${tokenID} is ${uri}`);
      return uri;
  }


  listItem = (props) => {
    return <li>{props.value}</li>;
  }

  subscribe = async () => {
    let events = await this.context.drizzle.contracts.ethritageToken.events;
    events.Transfer(
      {
        fromBlock: 0
      },
      function(error, event) {
        if (error) {
          console.log(error);
        }

        let tokenId = event.returnValues.tokenId;

        console.log("The Event for Token: ", event.event);
        console.log("The Token id: ", tokenId);
      }
    );

}

  render() {

      
    return <ol>Total Tokens : {this.totalSupply}<br/>
    {this.URIlist.map((uri) => <this.listItem value={uri}/>)} </ol>;
  }
}

ListAllTokens.contextTypes = {
  drizzle: PropTypes.object
};

export default ListAllTokens;
