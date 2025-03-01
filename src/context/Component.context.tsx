import React, { createContext, ReactNode, useState } from 'react';
import { Component } from '../types';

interface ContextType {
  selectedComponents: string[];
  setSelectedComponents: (newValue: string[]) => void;
  components: Component[];
  setComponents : (newComponents: Component[]) => void;
}

interface ProviderPropsType {
  children: ReactNode;
}


const MyContext = createContext<ContextType | undefined>(undefined);

const MyProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [components, setComponents] = useState<Component[]>([]);


  return (
    <MyContext.Provider value={{ selectedComponents, setSelectedComponents, components,setComponents }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
