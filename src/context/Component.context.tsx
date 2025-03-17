import React, { createContext, ReactNode, useState } from 'react';
import { ComponentType, userinfo } from '../types';

interface ContextType {
  selectedComponents: ComponentType[];
  setSelectedComponents: (newValue: ComponentType[]) => void;
  components: ComponentType[];
  setComponents: (newComponents: ComponentType[]) => void;
  edithwmode: boolean;
  setEditHWMode: (newMode: boolean) => void; 
  editHeightWidth : ComponentType[];
  setEditHeightWidth : (newHeight : ComponentType[] )=> void;
  userdetail : userinfo | null;
  setUserDetail: (user : userinfo | null) => void
}

interface ProviderPropsType {
  children: ReactNode;
}

const MyContext = createContext<ContextType | undefined>(undefined);

const MyProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState<ComponentType[]>([]);
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [edithwmode, setEditHWMode] = useState<boolean>(false);
  const [ editHeightWidth,setEditHeightWidth] = useState<ComponentType[]>([]);
  const [userdetail, setUserDetail] = useState<userinfo | null>(null);

  return (
    <MyContext.Provider value={{ selectedComponents, setSelectedComponents, components, setComponents, edithwmode, setEditHWMode,editHeightWidth, setEditHeightWidth, userdetail,setUserDetail }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
