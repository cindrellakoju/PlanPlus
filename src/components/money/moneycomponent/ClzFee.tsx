import React, { useEffect } from "react";
import useMoney from "../../../hooks/useMoney"

interface ClzFeeProps{
    setbuttoncondition: (condition:boolean)=>void
}
const ClzFee: React.FC<ClzFeeProps> = ({setbuttoncondition}) =>{
    const {  setClzPaidAmount, setClzReason, buttoncondition,setButtonCondition, setTransactionState } = useMoney()

    const handleclzpaidamount = (event:React.ChangeEvent<HTMLInputElement>) => {
        setClzPaidAmount(Number(event.target.value))
    };

    const handleclzreason = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setClzReason(event.target.value)
    };

    useEffect(()=>{
        setbuttoncondition(buttoncondition)
        console.log(buttoncondition)
    },[buttoncondition,setButtonCondition])

    useEffect(()=>{
        setTransactionState("clzfee")
    },[])
    return(
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
                            onChange={handleclzpaidamount}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder="Reason..."
                            className="input-field"
                            onChange={handleclzreason}
                         />
                     </td>
                 </tr>
            </tbody>
        </table>
    )
}

export default ClzFee;