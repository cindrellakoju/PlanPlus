import { useEffect, useState } from 'react';

const useMoney = () => {
    const [transactionState, setTransactionState] = useState<string>("totake");
    const [moneyFrom, setMoneyFrom] = useState<string | undefined>(undefined);
    const [takeAmount, setTakeAmount] = useState<number | null>(null);
    const [takeReason, setTakeReason] = useState<string | undefined>(undefined);
    const [giveMoney, setGiveMoney] = useState<string | undefined>(undefined);
    const [giveAmount, setGiveAmount] = useState<number | null>(null);
    const [giveReason, setGiveReason] = useState<string | undefined>(undefined);
    const [clzPaidAmount, setClzPaidAmount] = useState<number | null>(null);
    const [clzReason, setClzReason] = useState<string | undefined>(undefined);
    const [buttoncondition, setButtonCondition] = useState<boolean>(false);

    // Modify useEffect to depend on the actual state values
    useEffect(() => {
        setButtonCondition(!!(
            (transactionState === "totake" && moneyFrom !== undefined && takeAmount !== null && takeReason !== undefined) ||
            (transactionState === "togive" && giveMoney !== undefined && giveAmount !== null && giveReason !== undefined) ||
            (transactionState === "clzfee" && clzPaidAmount !== null && clzReason !== undefined)
        ));
        console.log(buttoncondition)
    }, [moneyFrom, takeAmount, takeReason, giveMoney, giveAmount, giveReason, clzPaidAmount, clzReason]);

    return {
        transactionState, setTransactionState,
        moneyFrom, setMoneyFrom,
        takeAmount, setTakeAmount,
        takeReason, setTakeReason,
        giveMoney, setGiveMoney,
        giveAmount, setGiveAmount,
        giveReason, setGiveReason,
        clzPaidAmount, setClzPaidAmount,
        clzReason, setClzReason,
        buttoncondition
    };
};

export default useMoney;
