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
  var [file_id, setFileId] = useState<string>("")
  /*
  var [file_id1,setFileId1] = useState<string>("")
  var [file_id2,setFileId2] = useState<string>("")
  var [file_id3,setFileId3] = useState<string>("")
  var [file_id4,setFileId4] = useState<string>("")
  var [file_id5,setFileId5] = useState<string>("")
  var [file_id6,setFileId6] = useState<string>("")
  var [file_id7,setFileId7] = useState<string>("")
  var [file_id8,setFileId8] = useState<string>("")
  var [file_id9,setFileId9] = useState<string>("")
  */
  var x : string[] = [];


  http://localhost:3000/createcollection?item_count=2&file_id='first'&file_id1='second'
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    var numbersOfItems = queryParams.get('item_count');


    var file_id_param = queryParams.get('file_id');
    var file_id_param_string = file_id_param?.toString
    setFileId(file_id_param_string);
    /*
    var q1 = queryParams.get('file_id1')?.toString;
    var q2 = queryParams.get('file_id2')?.toString;
    var q3 = queryParams.get('file_id3')?.toString;
    var q4 = queryParams.get('file_id4')?.toString;
    var q5 = queryParams.get('file_id5')?.toString;
    var q6 = queryParams.get('file_id6')?.toString;
    var q7 = queryParams.get('file_id7')?.toString;
    var q8 = queryParams.get('file_id8')?.toString;
    var q9 = queryParams.get('file_id9')?.toString;
   */
    
  
   // x.push(file_id);
   




    
    var count : number;
    count = parseInt(numbersOfItems);
    console.log("item_total: ", count);
    
    for (let i = 0; i << count; i++) {
     // var uri : string;
      //var j = i + 1;
      //var jstr = j;
      var istr = i;
     // console.log("jstr:", jstr);
      var query : string;
      if (i == 0) {
        query = "file_id";
        console.log("query: ", query);
      } else {
      query = "file_id" + istr;
      console.log("query: ", query);
      }
      
      
      
       var request_q = queryParams.get(query);
        console.log("request_q: " + request_q);
        var result = request_q;
        console.log("result: ", result);
        
      //  x[i] = result;
      
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