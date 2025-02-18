import React from "react";
import useMoney from "../../../context/useMoney";

const MoneyButton:React.FC = () =>{
    const {
        moneyFrom, setMoneyFrom,
        takeAmount, setTakeAmount,
        takeReason, setTakeReason,
        giveMoney, setGiveMoney,
        giveAmount, setGiveAmount,
        giveReason, setGiveReason,
        clzPaidAmount, setClzPaidAmount,
        clzReason, setClzReason
    } = useMoney();

    const candisplaybutton: boolean = !!(
        (moneyFrom !== undefined && takeAmount !== undefined && takeReason !== undefined) || 
        (giveMoney !== undefined && giveAmount !== undefined && giveReason !== undefined) || 
        (clzPaidAmount !== undefined && clzReason !== undefined)
    );
    
    return(
        <>
            {
                candisplaybutton ?
                    <>  
                        <button>Click me</button>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default MoneyButton;