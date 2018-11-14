import ethritageToken from './../build/contracts/ethritageToken.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    ethritageToken
  ],
  events: {
    
  },
  polls: {
    accounts: 10000
  }
}

export default drizzleOptions