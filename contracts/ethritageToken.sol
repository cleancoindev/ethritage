pragma solidity ^0.4.24;


import "/Users/dennisonbertram/Documents/ethritage/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "/Users/dennisonbertram/Documents/ethritage/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";
import "/Users/dennisonbertram/Documents/ethritage/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol";

///Users/dennisonbertram/Documents/ethritage/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol
// node_modules/openzeppelin-solidity
// /Users/dennisonbertram/Documents/ethritage/node_modules/openzeppelin-solidity
// /Users/dennisonbertram/Documents/ethritage/contracts/ethritageToken.sol

contract ethritageToken is ERC721Full, ERC721MetadataMintable, ERC721Mintable {
    
    constructor(string name, string symbol) ERC721Full(name, symbol)  public {

    }

}