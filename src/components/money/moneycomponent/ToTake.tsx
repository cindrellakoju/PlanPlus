import React from "react";
import useMoney from "../../../context/useMoney";

const ToTake:React.FC = () =>{
    const {setMoneyFrom,setTakeAmount,setTakeReason}= useMoney()

    const handlemoneyfrom = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setMoneyFrom(event.target.value)
    }

    const handletakeamount = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTakeAmount(event.target.value)
    }

    const handletakereason = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTakeReason(event.target.value)
    }

    return(
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
                        onChange={handlemoneyfrom}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Amount..."
                        className="input-field"
                        onChange={handletakeamount}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Reason..."
                        className="input-field"
                        onChange={handletakereason}
                    />
                </td>
            </tr>
        </tbody>
    </table>
    )
}
export default ToTake;