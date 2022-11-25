import { createContext } from 'react';
import { MenuItem } from './types';

const MenuListContext = createContext({ onMenuClick: (id: string, item: MenuItem) => {} });

export default MenuListContext;
