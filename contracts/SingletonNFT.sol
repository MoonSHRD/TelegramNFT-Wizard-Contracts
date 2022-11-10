//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/**
 *  Singleton NFT
 *  Each file is a record inside this single contract
 */
contract SingletonNFT is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter token_ids_count;

    event ItemCreated (string file_id, uint256 token_id);

    constructor(string memory name_, string memory smbl_) ERC721(name_, smbl_) ERC721URIStorage() {

    }


    /**
     *  @dev create nft (single record in this contract) with provided file_id and returns token_id
     *  @param file_id unique file_id string obtained from telegram(?)
     */
    function CreateItem(string memory file_id) public returns (uint256 token_id) {
        token_ids_count.increment();
        token_id = token_ids_count.current();
        _safeMint(msg.sender,token_id);
        _setTokenURI(token_id,file_id);
        emit ItemCreated(file_id,token_id);
    }


}