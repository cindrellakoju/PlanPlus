import React, { useState } from "react";

const MoneyField:React.FC = () =>{
    const [transactionstate,setTransactionState] = useState<boolean>(true)
    return(
        <div>
            <div>
                <label htmlFor="money">Choose Transaction Option:</label>
                <select id="money" onChange={()=> setTransactionState(!transactionstate)}>
                    <option value="totake">To Take</option>
                    <option value="togive">To Give</option>
                </select>
            </div>
            <div>
                {
                    transactionstate ?
                            <>
                                <table>
                                    <tr>
                                        <th>Take Money From</th>
                                        <th>Amount</th>
                                        <th>Reason</th>
                                    </tr>
                                    <tr>
                                        <td>Sanjib</td>
                                        <td>Rs. 500</td>
                                        <td>Chips of dharan</td>
                                    </tr>
                                </table>
                            </>
                    :
                            <>
                                <table>
                                    <tr>
                                        <th>Give Money To</th>
                                        <th>Amount</th>
                                        <th>Reason</th>
                                    </tr>
                                    <tr>
                                        <td>Saurav</td>
                                        <td>Rs. 500</td>
                                        <td>Dharan totle</td>
                                    </tr>
                                </table>
                            </>
                }
            </div>
        </div>
    )
}

export default MoneyField;