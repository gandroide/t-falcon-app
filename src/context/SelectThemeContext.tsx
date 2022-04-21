import React, { createContext, FC, useState } from 'react';
import { IMenu } from '../interfaces';

interface IMenuContext {
  menu: IMenu[];
  onSetContext: (onMenu: IMenu[]) => void;
}

type C = IMenuContext | null;

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

  const onSetContext = (onMenu: IMenu[]) => {
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
