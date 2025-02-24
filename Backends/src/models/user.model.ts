import db from "../config/db.config";

type Callback = (err: any, results?: any) => void;

const getTodolist = (callback: Callback) => {
    const query = "SELECT * FROM todolist";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching todolist:", err);  // You can add logging for debugging
            return callback(err);
        }
        callback(null, results);
    });
};

export default getTodolist;
