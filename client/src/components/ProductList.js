import React, { useContext,useEffect } from 'react'
import {GlobalContext} from '../contex/GlobalState'
import Transaction from './Transaction'
export default function TransactionList() {
  const {transaction,getTransactions} =useContext(GlobalContext);

  useEffect(()=>{
    getTransactions()
  },[])
  console.log("The api data is ",transaction);
    return (
        <div>
    <h3>History</h3>
      <ul className="list">
        {transaction.map(transaction=>(
          <Transaction key={transaction.id} transaction={transaction}/>
        ))}
         
      </ul>
        </div>
    )
}
