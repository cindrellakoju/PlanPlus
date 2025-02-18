import React, { useState } from "react";
import ToTake from "./moneycomponent/ToTake";

const MoneyField: React.FC = () => {
    const [transactionstate, setTransactionState] = useState<string>("totake");
    const [moneyfrom,setMoneyFrom] = useState<string>("");
    const [takeamount,setTakeAmount] = useState<string>("");
    const [takereason,setTakeReason] = useState<string>("");
    const [givemoney, setGiveMoney] = useState<string>("");
    const [giveamount, setGiveAmount] = useState<string>("");
    const [givereason, setGiveReason] = useState<string>("");
    const [clzpaidamount, setClzPaidAmount] = useState<string>("");
    const [clzreason, setClzReason] = useState<string>("");
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
                        <ToTake/>
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
                                            onChange={(event)=> setGiveMoney(event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Amount..."
                                            className="input-field"
                                            onChange={(event)=> setGiveAmount(event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Reason..."
                                            className="input-field"
                                            onChange={(event)=> setGiveReason(event.target.value)}
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
                                            onChange={(event)=> setClzPaidAmount(event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Reason..."
                                            className="input-field"
                                            onChange={(event)=> setClzReason(event.target.value)}
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
