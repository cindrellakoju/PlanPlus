import React, { useEffect, useState } from "react";
import { ThemeProps } from "../../types";
import "./ThemeOne.css"
import MoreThanOneCol from "../themethree/morethanonecol";
import axios from "axios";
import { useUserInfo } from "../../hooks/useUserInfo";

interface ColumnData {
    column_name: string;
}
  

const ThemeOne: React.FC<ThemeProps>  = ({ table_name, urlname }) => {
    const {backend_url} = useUserInfo()
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
    const [colname, setColName] = useState<string|string[]>()
    const [datas, setData] = useState<Record<string, any>[]>([]);

    const insertinurl = {
        tablename : urlname
    }

    useEffect(() => {
        axios
          .post(`${backend_url}/user/tablecolumn/2`, insertinurl)
          .then((response) => {
            const columns = response.data.map((item: ColumnData) => item.column_name);
            setColName(columns);
          })
          .catch((error) => {
            console.log("Error fetching data", error);
          });
          
        axios
          .post(`${backend_url}/user/columndata/2`, insertinurl)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            console.log("Error fetching", err);
          });
        }, [table_name]);

    return(
        <div className="themeonecontainer">
            <div className="headerfield">
                <div className="heading">{table_name}</div>
                <div className="buttons">
                <i className='bx bx-dots-vertical-rounded'></i>
                    <div className="dropdown">
                    <ul>
                            <>
                            <li>Completed</li>
                            <li >Delete</li>
                            </>
                        <li>Add</li>
                        <li >Edit</li>
                    </ul>
                    </div>
                </div>
            </div>

            <div className="themeonebody">
            {
                colname && colname.length >= 2 && (
                    <MoreThanOneCol 
                        data={datas} 
                        addcheckbox={true} 
                        displacolname={true} 
                        col_name={colname} 
                        table={false} 
                        bgforhead={false} 
                        checkitemEditing ={false}
                        isEditing = {false}
                        checkeditem = {checkedItems}
                        setCheckedItems = {setCheckedItems}
                        table_name = {table_name}
                        themeid={1}
                    />
                )
            }
            </div>
        </div>
    )
}

export default ThemeOne