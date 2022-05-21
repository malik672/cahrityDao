import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import Charity from "./Charity.json";
import Token from "./Token.json";
import {useEffect, useState} from "react"
import { initializeApp } from 'firebase/app';
import {useLocation} from "react-router-dom";
import Content from '/home/malik/Desktop/crypto/Governance/my-app/src/components/Content.jsx';

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set,get,child, onValue } from "firebase/database";
import {ref as sRef, uploadBytes, getDownloadUrl, getDownloadURL } from "firebase/storage";



function App() {
  const [purpose, setPurpose] = useState();
  const [receiver, setReceiver] = useState("");
  const [target, setTarget] = useState("");
  const [value, setValue] = useState("");
  const [desi, setDesi] = useState("");
  const [fors, setFor] = useState("");
  const [against, setAgainst] = useState("");
  const [state, setState] = useState("");
  const [executes, setExecute] = useState("");
  const [cancel, setCancel] = useState("");



  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(Charity.abi,'0xbd84159e9d34b3E5f01a98b07cFbaDabE1ee3D4D');
  let contracts = new web3.eth.Contract(Token.abi,'0x00D4ba5B41961BCE6D33df0B65876Ca968F1c07c');

  let id = -1;


  const re = window.addEventListener('load', (e)=>{})
  useEffect(() => {
    const btns =  document.querySelector('.btn-wallet')
     const wallets = async(e) =>{
        if(window.ethereum.networkVersion !== '5'){
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x5"}],
          })
          btns.innerText = "connect wallet";
        }else if(window.ethereum.networkVersion === '5'){
          btns.innerText =window.ethereum.selectedAddress;
        } if(window.ethereum.selectedAddress === null){
          btns.innerText = 'connect wallet';
        }
     }
     wallets()
    }, [re]);

    const wallet = async(e) => {
      if(window.ethereum){
     
        await window.ethereum.request({
         method: "eth_requestAccounts",
         params: [
           {
             eth_accounts: {}
           }
         ]
       });
     
       if(window.ethereum.networkVersion !== '5'){
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: "0x5"}],
        })
       }else{
         alert("connected");
       }
     
      }else{
        alert("please install metamask")
      }
     }
     
     const main = async(e) => {
       try{
        const firebaseConfig = {
          apiKey: "AIzaSyA9Xi7rE8j2-G6Hhg-jxXGgGLZ-T3OZeRs",
          authDomain: "global-38c80.firebaseapp.com",
          projectId: "global-38c80",
          storageBucket: "global-38c80.appspot.com",
          messagingSenderId: "436303615902",
          appId: "1:436303615902:web:6e28dfff6d4b6d2c12288f",
          measurementId: "G-G1WWBZSFJ8",
        };        

        const app = initializeApp(firebaseConfig);
        id = id + 1; 

        const db = getDatabase();

        async function writeUserData(purpose,target,address, proposalId){
          const refrence = ref(db, 'Charity/' + proposalId);         
          set(refrence, {
            purpose:purpose,
            target:target,
            address:address,
            proposalId:proposalId
          })
      
        }
        writeUserData(purpose, target, receiver, id);
       }catch(e){

       }

       const db = getDatabase();

       const refrence = ref(db, 'Charity/')
        onValue(refrence, (snapshot) =>{
          const data = snapshot.val();
          if(data !== null){
            const datas = Object.entries(data);
            setState(datas);
            datas.map((a)=>{
              console.log(a[1].address);
            })
          }
        })
     }

     //add proposal
     const add = async(e) => {
      e.preventDefault();

      try{ 
         const test = await contract.methods.addProposal(purpose, receiver, target).send({
           from: window.ethereum.selectedAddress,
           value:0
         });
         if(test.status === true){
           main();
         }
      }catch(e){

      }
     }

     const mint = async(e) => {//not done yet
       await contracts.methods.mint().send({
         from:window.ethereum.selectedAddress,
         value:0
       })
     }

     const designate = async(e) => {
       await contracts.methods.designate(desi).send({
         from: window.ethereum.selectedAddress,
         value:0
       })
     }

     //vote for
     const voteFor = async(e) => {
       await contract.methods.voteFor(fors).send({
         from: window.ethereum.selectedAddress,
         value:0
       })
     }

     //Vote Against
     const voteAgainst = async(e) => {
      await contract.methods.voteAgainst(against).send({
        from: window.ethereum.selectedAddress,
        value:0
      })
     }

     const execute = async(e) => {
      await contract.methods.executeProposal(executes).send({
        from: window.ethereum.selectedAddress,
        value:0
      })
     }

     const cancels = async(e) => {
      await contract.methods.cancelProposal(cancel).send({
        from: window.ethereum.selectedAddress,
        value:0
      })
     }

     const time = async(e) => {
     let times =   await contract.methods.timeLeft(0).send({
        from: window.ethereum.selectedAddress,
        value:0
       })
       console.log(times)
     }
  
  return (
    <div className="App">
       <header className="header">
         <div>
           <h1>
             Charity.org
           </h1>
         </div>
         <nav>
             <ul className='liste'>
                 <button className="btn btn-wallet" onClick={(e) =>(wallet(e))}>
                      Connect Wallet
                 </button>
             </ul>
         </nav>
      </header>
      <div className ="container">
        <form>
          <div>
            <label>Purpose</label>
            <input type="text" onChange={(e)=>(setPurpose(e.target.value))}/>
          </div>
          <div>
            <label>Receiver Address</label>
            <input type="text" onChange={(e)=>(setReceiver(e.target.value))}/>
          </div>
          <div>
            <label>Target Amount</label>
            <input type="number" onChange={(e)=>(setTarget(e.target.value))}/>
          </div>
          <button type="submit" onClick={(e)=>(add(e))}>Submit</button>
        </form>
        <div className="container-2">
           <div className="mint">
             <label>mint tokens: note you have to pay</label>
             <input type="text" className="minted" onChange={(e) =>(setValue(e.target.value))}/>
             <button onClick={(e)=>(mint())}>Mint</button>
           </div>
           <div className="designate">
             <label>designate votes to anyone</label>
             <input type="text" onChange={(e) => (setDesi(e.target.value))}/>
             <button onClick={(e)=>(designate())}>Mint</button>
           </div>
        </div>
      </div>
    <section>
      <Content/>
    </section>
    <section className="section">
       <div>
         <label>vote for: input proposal Id</label>
         <input type="number" onChange={(e) =>(setFor(e.target.value))}/>
         <button onClick={(e)=>(voteFor())}>VoteFor</button>
       </div>
       <div>
         <label>vote Against: input proposal Id</label>
         <input type="number" onChange={(e) =>(setAgainst(e.target.value))}/>
         <button onClick={(e)=>(voteAgainst())}>VoteAgainst</button>
       </div>
       <div>
         <label>execute: input proposal Id</label>
         <input type="number" onChange={(e) =>(setExecute(e.target.value))}/>
         <button onClick={(e)=>(execute())}>Execute</button>
       </div>
       <div>
         <label>cancel: input proposal Id</label>
         <input type="number" onChange={(e) =>(setCancel(e.target.value))}/>
         <button onClick={(e)=>(cancels())}>Execute</button>
         <button onClick={(e)=>(time())}>Execute</button>
       </div>
    </section>
    </div>
  );
}

export default App;
