import { useState } from 'react';

const useMoney = () => {
    const [transactionState, setTransactionState] = useState<string>("totake");
    const [moneyFrom, setMoneyFrom] = useState<string>("");
    const [takeAmount, setTakeAmount] = useState<string>("");
    const [takeReason, setTakeReason] = useState<string>("");
    const [giveMoney, setGiveMoney] = useState<string>("");
    const [giveAmount, setGiveAmount] = useState<string>("");
    const [giveReason, setGiveReason] = useState<string>("");
    const [clzPaidAmount, setClzPaidAmount] = useState<string>("");
    const [clzReason, setClzReason] = useState<string>("");

    // return the state values and setters so they can be used in the component
    return {
        transactionState, setTransactionState,
        moneyFrom, setMoneyFrom,
        takeAmount, setTakeAmount,
        takeReason, setTakeReason,
        giveMoney, setGiveMoney,
        giveAmount, setGiveAmount,
        giveReason, setGiveReason,
        clzPaidAmount, setClzPaidAmount,
        clzReason, setClzReason
    };
};

export default useMoney;
