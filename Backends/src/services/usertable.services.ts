import { insertUser, findByEmail } from "../models/usertable.model";
import bcrypt from "bcryptjs";
import { user } from "../types/todo.type";

export const registerUser = (insertUserData: user): Promise<any> => {
    return new Promise((resolve, reject) => {
        findByEmail(insertUserData.email, (error, result) => {
            if (error) {
                return reject(error); // fixed: reject on error
            }
            
            if (result && result.foundEmail) {
                return resolve({ message: "Email already exists" }); // fixed: return a meaningful message if email exists
            }

            const hashedPassword = bcrypt.hashSync(insertUserData.password, 10);

            const newUser = {
                ...insertUserData,
                password: hashedPassword
            };

            insertUser(newUser, (err, result) => {
                if (err) {
                    return reject(err); // fixed: reject on error
                }
                resolve(result); // fixed: resolve with the result
            });
        });
    });
};
