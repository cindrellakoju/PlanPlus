import React, { useState } from "react";

const MoneyField:React.FC = () =>{
    const [transactionstate,setTransactionState] = useState<boolean>(true)
    return(
        <div className="moneyfieldcontainer">
            <div className="chooseoption">
                <label htmlFor="money">Choose Transaction Option:  </label>
                <select id="money" onChange={()=> setTransactionState(!transactionstate)}>
                    <option value="totake">To Take</option>
                    <option value="togive">To Give</option>
                </select>
            </div>
            <div className="tablefield">
                {
                    transactionstate ?
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Take Money From</th>
                                            <th>Amount</th>
                                            <th>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Sanjib</td>
                                            <td>Rs. 500</td>
                                            <td>Chips of dharansdhisb scss sdhj</td>
                                        </tr>
                                    </tbody>
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