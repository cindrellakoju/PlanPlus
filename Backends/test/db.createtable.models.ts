import db from "../src/config/db.config";
import { userinputfortable, Callback } from "../src/types/todo.type";

export const CreateTableByUserModel = (userId:number,userinputfortable: userinputfortable, callback: Callback) => {
    const tablename = userinputfortable.tablename
    console.log("Obtained info:",userinputfortable)
    const orderindexquery = `
    SELECT MAX(orderindex) AS maxorderindex
    FROM user_tables
    WHERE user_id = ?;
    `;

    db.query(orderindexquery,[userId],(err,results) => {
        if(err){
            console.log("Error feching order index",err);
            return;
        }
        const rows = results as { maxorderindex: number | null }[];
        const maxOrderIndex = rows[0]?.maxorderindex ?? 0;
        const order_index = maxOrderIndex + 1
        const Inserttablenamequery = `
        INSERT INTO user_tables(user_id,table_name,theme_id,orderindex,width,height,checkbox,table_margin,bg_for_header,col_name)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(Inserttablenamequery,[userId,tablename,userinputfortable.themeid,order_index,400,400,userinputfortable.checkbox,userinputfortable.tablemargin,userinputfortable.bgforhead,userinputfortable.displaycolname],(err,results) => {
            if(err){
                console.log("Error inserting newTable:",err.message)
                callback(err,null);
                return
            }
            console.log("Sucessfully inserted table")
        })

        const extracttableid = `
        SELECT user_table_id
        FROM user_tables
        WHERE user_id = ? AND table_name = ?
    ` 
        db.query(extracttableid,[userId,tablename],(err,results)=>{
            if(err){
                console.log("Error extractting table id:",err.message)
                callback(err,null);
                return
            }
            const rows = results as { user_table_id : number | null}[];
            const tableid = rows[0]?.user_table_id ?? 0
            const insertcolumnquery = `
                INSERT INTO user_table_columns(user_table_id,column_name,column_type,theme_id)
                VALUES (?, ?, ?, ?)
            `
        
            userinputfortable.colname
            .map((colname, index) => {
                const coltype = userinputfortable.coltype[index];
                const columnname = colname.toLowerCase()
                db.query(insertcolumnquery,[tableid, columnname,coltype,userinputfortable.themeid],(err,results) => {
                    if(err){
                        console.log("Error inserting colname:",err.message)
                        callback(err,null);
                        return
                    }
                    callback(null, results);
                })
                })
            })

        })


};
