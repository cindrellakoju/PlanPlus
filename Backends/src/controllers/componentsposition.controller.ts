import { Request, Response } from "express";
import { fetchComponents, updateComponents } from "../services/componentsposition.services";
import { components } from "../types/todo.type";

export const getComponentsController = async(req:Request,res:Response) =>{
    try{
        const components = await fetchComponents();
        res.status(200).json(components)
    }catch(err){
        res.status(500).json({ message : "Error fetching data from componentspositiontable ", error : err });
    }
} 

export const updateComponentsController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);  // Get the ID from the route parameter
        const updatedComponent: components = {
            component_id: id, 
            order_index: req.body.order_index,
            position_x: req.body.position_x,
            position_y: req.body.position_y,
        };

        const result = await updateComponents(updatedComponent); 
        res.status(200).json({ message: "Component updated successfully", result });
    } catch (err) {
        res.status(500).json({ message: "Error updating component", error: err });
    }
};