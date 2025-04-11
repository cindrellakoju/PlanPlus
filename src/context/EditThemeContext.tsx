import React, { createContext, ReactNode, useState } from "react";

interface EditThemeContextType{
    editHeightWidth : boolean,
    setEditHeightWidth : React.Dispatch<React.SetStateAction<boolean>>
} 

const EditThemeContext = createContext<EditThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode;
}
const EditThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {

    const [editHeightWidth, setEditHeightWidth] = useState<boolean>(false)

      return (
        <EditThemeContext.Provider value={{ editHeightWidth, setEditHeightWidth }}>
          {children}
        </EditThemeContext.Provider>
      );
} 

export {EditThemeProvider,EditThemeContext}