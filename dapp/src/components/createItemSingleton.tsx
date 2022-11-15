import React, { useState, useEffect } from 'react'
import {Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel, Text } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {abi} from '../../../artifacts/contracts/SingletonNFT.sol/SingletonNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"


interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;


export default function CreateItemSingletonTG(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount

  var [file_id, setFileId] = useState<string|null>("")

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);


  //var name = queryParams.get('user_tg_name');
  
  var file_id_param = queryParams.get('file_id');
  var file_id_param_string = file_id_param?.toString
  setFileId(file_id_param);

  //setUserId(int_id);
  //setUserName(name);
  
  }, []);
  




    async function createItemSingleton(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const SingletonNFT:Contract = new ethers.Contract(addressContract, abi, signer)
    SingletonNFT.CreateItem(file_id)
     .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then((receipt:TransactionReceipt) => {console.log("create item receipt", receipt)})
        })
         .catch((e:Error) => console.log(e))
    }


  
  //const handleChange = (value:string) => setUserId(value)
  //http://localhost:3000?user_tg_id=1337&user_tg_name=Alice
  return (
    <form onSubmit={createItemSingleton}>
    <FormControl>
      <FormLabel htmlFor='FileID'>Unique File ID: </FormLabel>
      <div>
      <Text><b>Unique File id</b>:{file_id}</Text>
      </div>
      <Button type="submit" isDisabled={!currentAccount}>Create NFT!</Button>
    </FormControl>
    </form>
  )
}