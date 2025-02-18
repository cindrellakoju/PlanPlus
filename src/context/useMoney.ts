import { useState } from 'react';

const useMoney = () => {
    const [transactionState, setTransactionState] = useState<string>("totake");
    const [moneyFrom, setMoneyFrom] = useState<string | undefined>(undefined);
    const [takeAmount, setTakeAmount] = useState<string | undefined>(undefined);
    const [takeReason, setTakeReason] = useState<string | undefined>(undefined);
    const [giveMoney, setGiveMoney] = useState<string | undefined>(undefined);
    const [giveAmount, setGiveAmount] = useState<string | undefined>(undefined);
    const [giveReason, setGiveReason] = useState<string | undefined>(undefined);
    const [clzPaidAmount, setClzPaidAmount] = useState<string | undefined>(undefined);
    const [clzReason, setClzReason] = useState<string | undefined>(undefined);

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
