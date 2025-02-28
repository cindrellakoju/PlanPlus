import React, { createContext, ReactNode, useState } from 'react';

interface ContextType {
  selectedComponents: string[];
  setSelectedComponents: (newValue: string[]) => void;
}

interface ProviderPropsType {
  children: ReactNode;
}

const MyContext = createContext<ContextType | undefined>(undefined);

const MyProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  return (
    <MyContext.Provider value={{ selectedComponents, setSelectedComponents }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
