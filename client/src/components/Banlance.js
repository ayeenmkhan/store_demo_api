import React, { useContext } from 'react'
import { GlobalContext } from "../contex/GlobalState";
import {numberWithCommas} from "../utils/format"
export default function Banlance() {
    const { transaction } = useContext(GlobalContext)

    const amounts = transaction.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </div>
    )
}
