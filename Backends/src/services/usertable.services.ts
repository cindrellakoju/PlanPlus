import { insertUser, findByEmail } from "../models/usertable.model";
import bcrypt from "bcryptjs";
import { user } from "../types/todo.type";

export const registerUser = (insertUserData: user): Promise<any> => {
    return new Promise((resolve, reject) => {
        findByEmail(insertUserData.email, (error, result) => {
            if (error) {
                return reject(error); 
            }
            
            if (result && result.foundEmail) {
                return resolve({ message: "Email already exists" }); 
            }

            const hashedPassword = bcrypt.hashSync(insertUserData.password, 10);

            const newUser = {
                ...insertUserData,
                password: hashedPassword
            };

            insertUser(newUser, (err, result) => {
                if (err) {
                    return reject(err); 
                }
                resolve(result);
            });
        });
    });
};
