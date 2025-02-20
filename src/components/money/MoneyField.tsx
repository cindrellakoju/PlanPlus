import ToTake from "./moneycomponent/ToTake";
import ClzFee from "./moneycomponent/ClzFee";
import ToGive from "./moneycomponent/ToGive";
import useMoney from '../../hooks/useMoney';

const MoneyField: React.FC = () => {
    const   {transactionState, setTransactionState,buttoncondition,setButtonCondition } = useMoney();

    const handleTransactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTransactionState(event.target.value);
    };

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
                {transactionState === "totake" ? (
                    <ToTake setButtonCondition = {setButtonCondition} />
                ) : transactionState === "togive" ? (
                    <ToGive />
                ) : (
                    <ClzFee />
                )}
            </div>
            <div>
                {buttoncondition ? (
                    <button>Click ME</button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default MoneyField;
