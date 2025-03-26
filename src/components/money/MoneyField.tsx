import ToTake from "./moneycomponent/ToTake";
import ClzFee from "./moneycomponent/ClzFee";
import ToGive from "./moneycomponent/ToGive";
import useMoney from '../../hooks/useMoney';
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const MoneyField: React.FC = () => {
    const {inside_temp_height} = ComponentWidthHeight("Money")
    const   {transactionState, setTransactionState,buttoncondition,setButtonCondition } = useMoney();

    const handleTransactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTransactionState(event.target.value);
    };
    // console.log("Transction State", transactionState)

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
            <div className="tablefield" style={{ maxHeight: inside_temp_height}}>
                {transactionState === "totake" ? (
                    <ToTake setButtonCondition = {setButtonCondition} />
                ) : transactionState === "togive" ? (
                    <ToGive setButtonCondition={setButtonCondition}/>
                ) : (
                    <ClzFee setbuttoncondition={setButtonCondition} />
                )}
            </div>
            <div className="button">
                {buttoncondition ? (
                    <button>Send</button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default MoneyField;
