import { error } from "console";
import { editComponents, getComponents } from "../models/componentsposition.model"
import { components } from "../types/todo.type";

export const fetchComponents = ():Promise<any> =>{
    return new Promise((resolve,rejects)=>{
        getComponents((err,results)=>{
            if(err) rejects(err);
            resolve(results);
        });
    });
};

export const updateComponents = (obtainedcomponent:components):Promise<any> => {
    return new Promise((resolve,rejects) => {
        editComponents(obtainedcomponent,(err , results) => {
            if(err) rejects(err)
            resolve(results);
        })
    });
} 