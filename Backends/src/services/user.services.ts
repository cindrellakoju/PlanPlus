import getTodolist from "../models/user.model";

export const fetchTodos = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        getTodolist((err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}