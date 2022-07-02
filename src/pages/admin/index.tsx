import { Outlet, Route, Routes } from 'react-router-dom';
import { Users } from '../Users';
import { UsersRegistry } from '../UsersRegistry';
import {
  AdminContainer,
  AdminContent,
  AdminItem,
  AdminLink,
  AdminList,
  AdminNav
} from './styled';

export const Admin = () => {
  return (
    <AdminContainer>
      <AdminNav>
        <AdminList>
          <AdminItem>
            <AdminLink to="/">Utilizadores</AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink to="picagens">Picagens</AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink to="aves">Aves</AdminLink>
          </AdminItem>
        </AdminList>
      </AdminNav>
      <AdminContent>
        <Outlet />
      </AdminContent>
    </AdminContainer>
  );
};
