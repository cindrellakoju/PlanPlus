import React, { useState } from "react";

const MoneyField: React.FC = () => {
    const [transactionstate, setTransactionState] = useState<string>("totake");
    const handleTransactionChange = (event : React.ChangeEvent<HTMLSelectElement>) =>{
        setTransactionState(event.target.value)
    }
    return (
        <div className="moneyfieldcontainer">
            <div className="chooseoption">
                <label htmlFor="money">Choose Transaction Option:  </label>
                <select id="money" onChange={handleTransactionChange}>
                    <option value="totake">To Take</option>
                    <option value="togive">To Give</option>
                    <option value="clzfee">Clz Fee</option>
                </select>
            </div>
            <div className="tablefield">
                {transactionstate === "totake" ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Take Money From</th>
                                    <th style={{ width: "10%" }}>Amount</th>
                                    <th style={{ width: "50%" }}>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
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
                ) : ( transactionstate === "togive" ?
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Give Money To</th>
                                    <th style={{ width: "10%" }}>Amount</th>
                                    <th style={{ width: "50%" }}>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Give Money To..."
                                            id="giveto"
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
                    </>:
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Paid Amount</th>
                                    <th style={{ width: "50%" }}>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Enter Paid Amount"
                                            id="paidamount"
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
                )}
            </div>
        </div>
    );
};

export default MoneyField;
