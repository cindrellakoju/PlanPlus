import React, { createContext, ReactNode, useState } from 'react';
import { ComponentType } from '../types';

interface ContextType {
  selectedComponents: ComponentType[];
  setSelectedComponents: (newValue: ComponentType[]) => void;
  components: ComponentType[];
  setComponents: (newComponents: ComponentType[]) => void;
  edithwmode: boolean;
  setEditHWMode: (newMode: boolean) => void; // <-- Corrected this line
}

interface ProviderPropsType {
  children: ReactNode;
}

const MyContext = createContext<ContextType | undefined>(undefined);

const MyProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState<ComponentType[]>([]);
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [edithwmode, setEditHWMode] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{ selectedComponents, setSelectedComponents, components, setComponents, edithwmode, setEditHWMode }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
