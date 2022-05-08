import React, { createContext, FC, useState } from 'react';
import { IDataSelect } from '../interfaces';

interface IDataContext {
  menu: IDataSelect[];
  onSetContext: (onMenu: IDataSelect[]) => void;
}

type C = IDataContext | null;

const defaultStateValue = [
  {
    salad: '',
    soup: '',
    meet: '',
    fish: '',
    vegetarian: '',
  },
];

export const SelectThemeContext = createContext<C>(null);

export const SelectThemeProvider: FC = ({ children }) => {
  const [menu, setMenu] = useState(defaultStateValue);

  const onSetContext = (onMenu: IDataSelect[]) => {
    setMenu(onMenu);
  };
  return (
    <SelectThemeContext.Provider
      value={{
        menu,
        onSetContext,
      }}
    >
      {children}
    </SelectThemeContext.Provider>
  );
};

export default SelectThemeProvider;
function menu<T>(menu: any, onSetContext: any) {
  throw new Error('Function not implemented.');
}

function onSetContext<T>(
  menu: <T>(menu: any, onSetContext: any) => void,
  onSetContext: any
) {
  throw new Error('Function not implemented.');
}
