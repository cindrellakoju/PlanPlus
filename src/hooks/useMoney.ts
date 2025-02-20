import { useEffect, useState } from 'react';

const useMoney = () => {
    const [transactionState, setTransactionState] = useState<string>("totake");
    const [moneyFrom, setMoneyFrom] = useState<string | undefined>("");
    const [takeAmount, setTakeAmount] = useState<number | null>(0);
    const [takeReason, setTakeReason] = useState<string | undefined>("");
    const [giveMoney, setGiveMoney] = useState<string | undefined>("");
    const [giveAmount, setGiveAmount] = useState<number | null>(0);
    const [giveReason, setGiveReason] = useState<string | undefined>("");
    const [clzPaidAmount, setClzPaidAmount] = useState<number | null>(0);
    const [clzReason, setClzReason] = useState<string | undefined>("");
    const [buttoncondition, setButtonCondition] = useState<boolean>(false);

    useEffect(() => {
        const btncondition =!!(
            (transactionState === "totake" && moneyFrom !== "" && takeAmount !== 0 && takeReason !== "") ||
            (transactionState === "togive" && giveMoney !== "" && giveAmount !== 0 && giveReason !== "") ||
            (transactionState === "clzfee" && clzPaidAmount !== 0 && clzReason !== "")
        )
        setButtonCondition(btncondition);
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
        buttoncondition, setButtonCondition
    };
};

export default useMoney;
