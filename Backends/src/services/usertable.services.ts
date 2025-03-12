import { insertUser, findByEmail, fetchLoginInfo } from "../models/usertable.model";
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

export const loginUser = (logininfo: user): Promise<any> => {
    return new Promise((resolve, reject) => {
        const { email, password } = logininfo;
        
        fetchLoginInfo(email, (err, results) => {
            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return reject(new Error("User not found"));
            }

            const storedPassword = results[0].password; // Assuming 'password' is stored in the database

            // Compare provided password with stored hashed password asynchronously
            bcrypt.compare(password, storedPassword, (err, isPasswordValid) => {
                if (err) {
                    return reject(new Error("Error comparing passwords"));
                }

                console.log("Password match:", isPasswordValid);  // Log the result of the comparison

                if (isPasswordValid) {
                    resolve(results[0]);  // Successful login
                } else {
                    reject(new Error("Invalid credentials"));
                }
            });
        });
    });
};

