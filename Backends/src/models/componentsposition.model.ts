import { error } from "console";
import db from "../config/db.config";
import { Callback, components } from "../types/todo.type";

export const getComponents = (callback:Callback) =>{
    const query = 'SELECT * from componentsposition ORDER BY order_index ASC';

    db.query(query,(error,results)=>{
        if(error){
            console.log("Error fetching components ",error)
            return callback(error)
        }
        return callback(null,results)
    })
}

export const editComponents = (obtainedcomponents:components, callback:Callback) =>{
    const {component_id , order_index, position_x, position_y} = obtainedcomponents;
    const query = " UPDATE componentsposition SET order_index = ?, position_x = ?, position_y = ? WHERE component_id = ? "
    db.query(query,[order_index,position_x,position_y,component_id],(error,results) => {
        if(error){
            console.log("Error Updating the data in component table: ",error)
            return callback(error);
        }
        callback(null,{ message : "Succcessfully updated component table "})
    })
}