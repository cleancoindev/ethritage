import TokenMintWithURI from './TokenMintWithURI'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    ethritage: state.contracts.ethritageToken,
    drizzleStatus: state.drizzleStatus,
    state: state,
  }
}

const TokenMintWithURIContainer = drizzleConnect(TokenMintWithURI, mapStateToProps);

export default TokenMintWithURIContainer