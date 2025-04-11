// ThemeThree.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import './ThemeThree.css';
import OneColName from './onecolname';
import MoreThanOneCol from './morethanonecol';
import axios from 'axios';
import { useUserInfo } from '../../hooks/useUserInfo';
import { ThemeContext } from '../../context/Theme.context';
import { ThemeProps } from '../../types';
import { EditThemeContext } from '../../context/EditThemeContext';



interface ColumnData {
  column_name: string;
}

interface ApiResponse {
  column_data: string; // The data inside 'column_data' is a stringified JSON object
}


const ThemeThree: React.FC<ThemeProps> = ({ table_name, urlname, height, width, id, setLocalData, localData }) => {
  const {userId , backend_url} = useUserInfo()
  const [colname, setColName] = useState<string|string[]>()
  const col_name: string | string[] = ["task","priority",'status','description','deadline'];
  const [datas, setData] = useState<Record<string, any>[]>([]);
  const [checkitemEditing , setCheckedItemEditing] = useState<boolean>(false);
  const [isEditing,setIsEditing] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [addcheckbox, setAddCheckBox] = useState<boolean>(true);
  const [table, setTable] = useState<boolean>(false);
  const [bgforhead,setBgForHead] = useState<boolean>(true);
  const [displaycolname, setDisplayColname] = useState<boolean>(true);

  const [isResizingWidth, setIsResizingWidth] = useState<boolean>(false)
  const [isResizingHeight, setIsResizingHeight] = useState<boolean>(false)
  const [upheight,setUpHeight] = useState<number>(0)
  const [distwidth, setDistWdth] = useState<number>(0)
  const [newid,setNewId] = useState<number>(0) 

  const editcontext = useContext(EditThemeContext)
  if(!editcontext){
    throw new Error("Theme Three must be within EditThemeProvider")
  }

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



  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (checkedItems.size > 0 && !checkitemEditing ) {
      setCheckedItemEditing(true);
    }
      setIsEditing(true);
  }
  
  const handleDelete = () => {
    if (checkedItems.size > 0 && !checkitemEditing) {
      // Convert the Set to an array and map each item into an object
      const toSend = [...checkedItems].map(item => ({
        data_id: item
      }));
  
      toSend.forEach(item => {
        axios
          .post(`${backend_url}/user/deletedataoftable/2`, item) // Send only one item at a time
          .then((response) => {
            console.log("Successfully Deleted", response.data);
          })
          .catch((err) => {
            console.log("Error Deleting Data", err);
          });
      });
    }
  };
  
  const handleCompleted = () => {
    if (checkedItems.size > 0 && !checkitemEditing) {
      const filtered = datas.filter((item) => checkedItems.has(item.data_id));

      const updatedData = filtered.map(item => {
        const columnData = JSON.parse(item.column_data);  
        columnData.status = 'completed'; 
        item.column_data = JSON.stringify(columnData);  
        return item;  
      });

      updatedData.map((item) => {
        const tosend = {
          tablename: table_name,
          data_id: item.data_id,
          value: item.column_data
        }
        axios
        .put(`${backend_url}/user/updatedata/2`,tosend)
        .then((response) => {
          if(response){
            alert("Successfully edited the data")
          }
        })
        .catch((error) => {
          console.log("Error while updating:",error)
        })
      })
    }
  }

  console.log("Local Data:",localData)
    useEffect(() => {
      if ( isResizingHeight || isResizingWidth){
        console.log("Working here")
        const handleMouseMove = (e: MouseEvent) => {
          if (isResizingHeight) {
            const mousedrag = e.clientY - upheight;
            const updatedHeight= localData.map((comp) => {
              if (comp.user_table_id === newid) {
                return {...comp,height:mousedrag}
              }
              return comp
            });
            if(updatedHeight){
              setLocalData(updatedHeight)
            }
            console.log("Updated Component:",updatedHeight)
          }
  
          if(isResizingWidth){
            const dragwidth = e.clientX - distwidth;
            const updatedwidth = localData.map((comp)=> {
                if(comp.user_table_id === newid) {
                  return { ...comp, width: dragwidth}
                }
                return comp
            });
            console.log(updatedwidth)
            if(updatedwidth){
              setLocalData(updatedwidth)
            }
          }
        }
        const handleMouseUp =  () => {
          setIsResizingHeight(false)
          setIsResizingWidth(false)
        };
  
        window.addEventListener("mousemove",handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
  
        // Clean the event listener when dragging ends
        return () => {
          window.removeEventListener("mousemove",handleMouseMove)
          window.removeEventListener("mouseup", handleMouseUp)
        }
      }
    }, [isResizingHeight,isResizingWidth])

    useEffect(()=> {
      if(editcontext.savemode){
        localData.map((comp) => {
          axios
          .put(`${backend_url}/user/updatetable/${userId}`,comp)
          .then((response) => {
            console.log("Successfull Updating Data:",response.data)
            if(response){
              alert("Updated Successfully")
            }
          })
          .catch((err)=> {
            console.log("Error Updating data:",err)
          })
        })

        editcontext.setEditHeightWidth(false)
      }

    },[editcontext.savemode])

  const handleMouseDownWidth = (e:React.MouseEvent<HTMLDivElement>, id:number, width: number) => {
    setDistWdth(e.clientX - width )
    setNewId(id)
    setIsResizingWidth(true)
  }

  const handleMouseDownHeight = (e:React.MouseEvent<HTMLDivElement>, id: number, height: number) => {
    setUpHeight(e.clientY - height)
    setNewId(id)
    setIsResizingHeight(true)
  }
  return (
    <>
    <div className="note-container" style={{ height: `${height}px`, width: `${width}px`}}>
      {
        editcontext.editHeightWidth && (
          <>
            <div className='width'
              style={{ height: `${height}px`, cursor:'ew-resize' }}
              onMouseDown={(e) => handleMouseDownWidth(e, id,width)}
            />
            <div className='height' 
              style={{width: `${width}px`,cursor:'ns-resize'}}
              onMouseDown={(e) => handleMouseDownHeight(e, id, height)}/>
          </>
        )
      }
      <div className="header">{table_name}</div>
      <div className="buttons">
        <i className="bx bx-dots-horizontal-rounded"></i>
        <div className="dropdown">
          <ul>
            {addcheckbox ? (
              col_name.includes("status") && (
                <>
                  <li onClick={handleCompleted}>Completed</li>
                  <li onClick={handleDelete}>Delete</li>
                </>
              )
            ) : null}
            <li>Add</li>
            <li onClick={handleEdit}>Edit</li>
          </ul>
        </div>
      </div>
      <div className='body'>
      {
        colname && colname.length === 1 && (
          <OneColName 
            isEditing={isEditing} 
            textareaRef={textareaRef} 
            datas={datas} 
            setData={setData} 
          />
        )
      }

      {
        colname && colname.length >= 2 && (
          <MoreThanOneCol 
            data={datas} 
            addcheckbox={addcheckbox} 
            displacolname={displaycolname} 
            col_name={colname} 
            table={table} 
            bgforhead={bgforhead} 
            checkitemEditing = {checkitemEditing }
            isEditing = {isEditing}
            checkeditem = {checkedItems}
            setCheckedItems = {setCheckedItems}
            table_name = {table_name}
          />
        )
      }

      </div>
    </div>
    </>
  );
};

export default ThemeThree;