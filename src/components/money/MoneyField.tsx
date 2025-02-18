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
                                            <th style={{width:"30%"}}>Take Money From</th>
                                            <th style={{width:"10%"}}>Amount</th>
                                            <th style={{width:"50%"}}>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td>Sanjib</td>
                                            <td>Rs. 500</td>
                                            <td>Chips of dharansdhisb scss sdhj</td>
                                        </tr> */}
                                        <tr>
                                            <td>
                                                <input
                                                type="text"
                                                placeholder="Take Money From..."
                                                id="moneyfrom"
                                                className="input-field"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                placeholder="Amount..."
                                                className="input-field"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                placeholder="Reason..."
                                                className="input-field"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                    :
                            <>
                                <table>
                                    <tr>
                                        <th style={{width:"30%"}}>Give Money To</th>
                                        <th style={{ width:"10%"}}>Amount</th>
                                        <th style={{width:"50%"}}>Reason</th>
                                    </tr>
                                    {/* <tr>
                                        <td>Saurav</td>
                                        <td>Rs. 500</td>
                                        <td>Dharan totle</td>
                                    </tr> */}
                                    <tr>
                                        <td>
                                            <input
                                            type="text"
                                            placeholder="Give Money To..."
                                            id="moneyfrom"
                                            className="input-field"
                                        />
                                        </td>
                                        <td>
                                            <input
                                            type="text"
                                            placeholder="Amount..."
                                            className="input-field"
                                            />
                                        </td>
                                        <td>
                                            <input
                                            type="text"
                                            placeholder="Reason..."
                                            className="input-field"
                                        />
                                        </td>
                                    </tr>
                                </table>
                            </>
                }
            </div>
        </div>
    )
}

export default MoneyField;