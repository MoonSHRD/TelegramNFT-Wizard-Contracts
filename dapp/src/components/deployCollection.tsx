import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel, Text } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {abi} from '../../../artifacts/contracts/FactoryNFT.sol/FactoryNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"


interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;


export default function CreateCollectionTG(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount

  //var [file_id, setFileId] = useState<string|null>("")
  var [name, setName] = useState<string>("")
  var [symbol, setSymbol] = useState<string>("")
  var [file_ids, setFileIds] = useState<string[]>()
  var x : string[];


  http://localhost:3000/createcollection?item_count=10&file_id='first'&file_id1='second'
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    var numbersOfItems = queryParams.get('item_count');






    
    var count : number;
    var file_id_param = queryParams.get('file_id');
    //let file_id_param_string = file_id_param?.toString
    if (file_id_param != null) {
      x.push(file_id_param);
      //count = x.push(file_id_param);
      for (let numbersOfItems = 1; numbersOfItems < numbersOfItems - 1; numbersOfItems++) {
       // const element = array[numbersOfItems];
       var uri = queryParams.get('file_id' + numbersOfItems);
       console.log("uri: " + uri);
       x.push(uri);
       
        
      }
      //setFileId(file_id_param);
    } else {
     // setFileIds("");
    }
  
  
    
    if (Array.isArray(x)) {
        setFileIds(x);
    }
    


  var name_q = queryParams.get('name');
  var symbol_q = queryParams.get('symbol');
  if(name_q != null){
    setName(name_q);
  }
  if(symbol_q != null){
    setSymbol(symbol_q);
  }
 

  
  //var file_id_param = queryParams.get('file_id');
  //var file_id_param_string = file_id_param?.toString
  //setFileId(file_id_param);

  
  }, []);
  




    async function createCollection(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const FactoryNFT:Contract = new ethers.Contract(addressContract, abi, signer)
    FactoryNFT.CreateCollection()
     .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then((receipt:TransactionReceipt) => {console.log("create item receipt", receipt)})
        })
         .catch((e:Error) => console.log(e))
    }


  
  //const handleChange = (value:string) => setUserId(value)

  return (
    <form onSubmit={createCollection}>
    <FormControl>
      <FormLabel htmlFor='FileID'>CollectionData: </FormLabel>
      <div>
      <Text><b>Name of collection</b>:{name}</Text>
      <Text><b>Symbol of collection</b>:{symbol}</Text>
      <Text><b>File ids array</b>:{file_ids}</Text>
      </div>
      <Button type="submit" isDisabled={!currentAccount}>Create your own NFT Collection!</Button>

    </FormControl>
    </form>
  )
}