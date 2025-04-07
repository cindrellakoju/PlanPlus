import React, { createContext, ReactNode, useState } from "react";

interface ThemeContextType{
    checkedItems: Set<number>
    setCheckedItems: React.Dispatch<React.SetStateAction<Set<number>>>;
    bgforhead : boolean,
    setBgForHead : React.Dispatch<React.SetStateAction<boolean>>
    table : boolean,
    setTable : React.Dispatch<React.SetStateAction<boolean>>
    displaycolname : boolean,
    setDisplayColname : React.Dispatch<React.SetStateAction<boolean>>
    colname : string | string[],
    setColName : React.Dispatch<React.SetStateAction<string | string[]>>
    addcheckbox : boolean,
    setAddCheckBox : React.Dispatch<React.SetStateAction<boolean>>
} 

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
      const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
      const [bgforhead,setBgForHead] = useState<boolean>(true);
      const [table, setTable] = useState<boolean>(false);
      const [displaycolname, setDisplayColname] = useState<boolean>(true);
      const [colname, setColName] = useState<string|string[]>('');
      const [addcheckbox, setAddCheckBox] = useState<boolean>(true);

      return (
        <ThemeContext.Provider value={{ checkedItems, setCheckedItems, bgforhead, setBgForHead,
         table, setTable, displaycolname, setDisplayColname, colname, setColName ,
         addcheckbox, setAddCheckBox }}>
          {children}
        </ThemeContext.Provider>
      );
} 

export {ThemeProvider,ThemeContext}