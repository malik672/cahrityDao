import React from 'react';
import { initializeApp } from 'firebase/app';
import {useEffect, useState} from "react"
import Web3 from 'web3';
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import Charity from "./Charity.json";

const Content = () => {

 const[state,setState] = useState([]);

 const web3 = new Web3(window.ethereum);
 let contract = new web3.eth.Contract(Charity.abi,'0xbd84159e9d34b3E5f01a98b07cFbaDabE1ee3D4D');
 useEffect(() => {
    const getContent = async() =>{
          const firebaseConfig = {
            apiKey: "AIzaSyA9Xi7rE8j2-G6Hhg-jxXGgGLZ-T3OZeRs",
            authDomain: "global-38c80.firebaseapp.com",
            projectId: "global-38c80",
            databaseURL:"https://global-38c80-default-rtdb.firebaseio.com/",
            storageBucket: "global-38c80.appspot.com",
            messagingSenderId: "436303615902",
            appId: "1:436303615902:web:6e28dfff6d4b6d2c12288f",
            measurementId: "G-G1WWBZSFJ8",
        };   
    
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
  
    const refrence = ref(db, 'Charity/')
    onValue(refrence, (snapshot) =>{
      const data = snapshot.val();
      if(data !== null){
        const datas = Object.entries(data);
        setState(datas);
        datas.map((a)=>{
          console.log(a);
        })
      }
    })
  }
  getContent()
 
   }, [])
  
  return (
    <div className='cards'>
      {state.map((ea) =>{

        return (
          <ul className='card-body'>
            <li>purpose : {ea[1].purpose}</li>
            <li>user address : {ea[1].address}</li>
            <li>target: {ea[1].target}</li>
            <li>proposalId: {ea[1].proposalId}</li>
          </ul>
        )
      })}
    </div>
  )
}

export default Content