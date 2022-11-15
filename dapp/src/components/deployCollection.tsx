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
  var [name, setName] = useState<string|null>("")
  var [symbol, setSymbol] = useState<string|null>("")
  var [file_ids, setFileIds] = useState<string[]>()
  const router = useRouter();
  const x = router.query.file_id;

  if (Array.isArray(x)) {
      setFileIds(x);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    


  //var id = queryParams.get('user_tg_id');   // get id as string from query
  //let int_id : number = +id;                // similar to parseInt()
  //var name = queryParams.get('user_tg_name');

  var name_q = queryParams.get('name');
  var symbol_q = queryParams.get('symbol');
  setName(name_q);
  setSymbol(symbol_q);

  
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
  //http://localhost:3000?user_tg_id=1337&user_tg_name=Alice
  return (
    <form onSubmit={createCollection}>
    <FormControl>
      <FormLabel htmlFor='FileID'>CollectionData: </FormLabel>
      <div>
      <Text><b>Name of collection</b>:{name}</Text>
      <Text><b>Symbol of collection</b>:{symbol}</Text>
      <Text><b>File ids array</b>:{file_ids}</Text>
      </div>
      <Button type="submit" isDisabled={!currentAccount}>Create NFT!</Button>
    </FormControl>
    </form>
  )
}