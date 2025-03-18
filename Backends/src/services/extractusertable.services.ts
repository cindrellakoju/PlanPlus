import { tablename } from "../models/extractusertable.model";

export const gettablename = (user_id: number): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        tablename(user_id, (err, results) => {
            if (err) {
                reject(err);
            }
            
            // Ensure results is not undefined, and if it is, resolve with an empty array
            resolve(results || []); // If results is undefined, return an empty array
        });
    });
};
