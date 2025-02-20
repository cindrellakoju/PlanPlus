import { useEffect } from "react";
import useMoney from "../../../hooks/useMoney";

interface ToGiveProps{
    setButtonCondition: (condition:boolean) => void
}
const ToGive:React.FC<ToGiveProps>= ({setButtonCondition}) =>{
    const {giveMoney,giveAmount,giveReason,setGiveMoney,setGiveAmount,setGiveReason,buttoncondition,transactionState,setTransactionState} = useMoney()

    console.log(giveMoney,giveAmount,giveReason,buttoncondition,transactionState)
    const handlegivemoney = (event:React.ChangeEvent<HTMLInputElement>) => {
        setGiveMoney(event.target.value)
    };
    const handlegiveamount= (event:React.ChangeEvent<HTMLInputElement>) => {
        setGiveAmount(Number(event.target.value))
    };
    const handlegivereason = (event:React.ChangeEvent<HTMLInputElement>) => {
        setGiveReason(event.target.value)
    };
    useEffect(()=>{
        setTransactionState("togive")
    },[])
    
    useEffect(()=>{
        setButtonCondition(buttoncondition)
    },[buttoncondition,setButtonCondition])
    return(
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
                    <td>Saurav</td>
                    <td>500</td>
                    <td>pathau and dharan final</td>
                </tr>
                <tr>
                    <td>Saurav</td>
                    <td>500</td>
                    <td>pathau and dharan final</td>
                </tr>
                <tr>
                    <td>Saurav</td>
                    <td>500</td>
                    <td>pathau and dharan final</td>
                </tr>
                <tr>
                    <td>Saurav</td>
                    <td>500</td>
                    <td>pathau and dharan final</td>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            placeholder="Give Money To..."
                            id="giveto"
                            className="input-field"
                            onChange={handlegivemoney}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder="Amount..."
                             className="input-field"
                            onChange={handlegiveamount}
                          />
                     </td>
                     <td>
                         <input
                             type="text"
                             placeholder="Reason..."
                             className="input-field"
                             onChange={handlegivereason}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ToGive