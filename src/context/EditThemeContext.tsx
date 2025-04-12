import React, { createContext, ReactNode, useState } from "react";

interface EditThemeContextType{
    editHeightWidth : boolean,
    setEditHeightWidth : React.Dispatch<React.SetStateAction<boolean>>,
    savemode : boolean,
    setSaveMode : React.Dispatch<React.SetStateAction<boolean>>,
    editPosition : boolean,
    setEditPosition : React.Dispatch<React.SetStateAction<boolean>>,
    addTable : boolean,
    setAddTable: React.Dispatch<React.SetStateAction<boolean>>,
    createTable : boolean,
    setCreateTable: React.Dispatch<React.SetStateAction<boolean>>,
} 

const EditThemeContext = createContext<EditThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode;
}
const EditThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {

    const [editHeightWidth, setEditHeightWidth] = useState<boolean>(false)
    const [savemode, setSaveMode] = useState<boolean>(false)
    const [editPosition, setEditPosition] = useState<boolean>(false)
    const [addTable, setAddTable] = useState<boolean>(false)
    const [createTable, setCreateTable] = useState<boolean>(false)

      return (
        <EditThemeContext.Provider value={{ editHeightWidth, setEditHeightWidth, savemode, setSaveMode, editPosition, setEditPosition, addTable, setAddTable, createTable, setCreateTable }}>
          {children}
        </EditThemeContext.Provider>
      );
} 

export {EditThemeProvider,EditThemeContext}