import { Request, Response } from "express";
import { gettablename } from "../services/extractusertable.services";

export const fetchtablename = async (req: Request, res: Response) => {
    const user_id = req.params.user_id; // Getting user_id from URL parameters
    try {
        const components = await gettablename(Number(user_id)); // Make sure to convert user_id to number
        res.status(200).json(components); // Return the fetched data as a JSON response
    } catch (err) {
        res.status(500).json({ message: "Error fetching data from componentspositiontable", error: err });
    }
};
