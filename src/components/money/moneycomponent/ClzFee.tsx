import React from "react";
import useMoney from "../../../context/useMoney"

const ClzFee: React.FC = () =>{
    const {  setClzPaidAmount, setClzReason } = useMoney()

    const handleclzpaidamount = (event:React.ChangeEvent<HTMLInputElement>) => {
        setClzPaidAmount(event.target.value)
    };

    const handleclzreason = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setClzReason(event.target.value)
    };
    
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