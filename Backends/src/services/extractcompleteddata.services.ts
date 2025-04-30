import { completedtask } from "../models/extractcompletedtask";

export const completedTaskServices = (user_id:number,completed_at:Date | String):Promise<any> => {
    // const formattedDate = completed_at.toISOString().split('T')[0];
    return new Promise((resolve,reject) => {
        completedtask(user_id, completed_at,(err,results) => {
            if (err) {
                console.log("Error in services:", err);  // More specific log message
                reject(err);  // Rejecting the promise on error
            } else {
                resolve(results);  // Resolving the promise with results
            }
        })
    })
}