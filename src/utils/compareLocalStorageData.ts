import { ComponentType } from "../types";

export const compareLocalStorageData = (component:ComponentType) => {
    // console.log("compare function working")
    const localStoragedataString = localStorage.getItem("selecteditem")
    let localStoragedata:ComponentType[] = []
    if(localStoragedataString){
        localStoragedata = JSON.parse(localStoragedataString)
    }
    const alreadySelected = localStoragedata.some((comp) => {
    // console.log("Component Name:",comp.table_name,comp.orderindex, component.orderindex);
    return (
            comp.table_name === component.table_name &&
            comp.user_table_id === component.user_table_id &&
            comp.orderindex === component.orderindex &&
            comp.height === component.height &&
            comp.width === component.width &&
            comp.checkbox === component.checkbox &&
            comp.bg_for_header === component.bg_for_header &&
            comp.col_name === component.col_name &&
            comp.table_margin === component.table_margin
        );
    });  
    // console.log("Already Selcted:",alreadySelected)
    if(!alreadySelected){
        const sameTableName = localStoragedata.some(
          (comp) => comp.table_name === component.table_name && comp.user_table_id === component.user_table_id
        );
        if (sameTableName) {
            const updatedData = localStoragedata.filter(
              (comp) =>
                !(comp.table_name === component.table_name && comp.user_table_id === component.user_table_id)
            );
            updatedData.push(component);
    
            updatedData.sort((a, b) => a.orderindex - b.orderindex); // Numeric sort for order_index
            localStorage.setItem("selecteditem", JSON.stringify(updatedData));
          }
          else{
            const selectedData = [...localStoragedata, component];
            selectedData.sort((a, b) => a.orderindex - b.orderindex); // Numeric sort for order_index
            localStorage.setItem("selecteditem", JSON.stringify(selectedData));
          }
    }
}