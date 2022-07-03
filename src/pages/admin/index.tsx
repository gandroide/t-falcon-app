import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../../components/AdminNavbar';
import { AdminContainer, AdminContent, AdminTitle } from './styled';

export const Admin = () => {
  return (
    <AdminContainer>
      <AdminTitle>Painel Admistração</AdminTitle>
      <AdminNavbar />
      <AdminContent>
        <Outlet />
      </AdminContent>
    </AdminContainer>
  );
};
