import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';
import { Button } from '../Button';
import { NavbarContainer, NavbarLogo } from './styled';
import TfalconImage from '../../pages/login/tfalcon.jpg';
import { AdminTitle } from '../../pages/admin/styled';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { user, onLogoutHandler } = useContext(AuthContext);
  const location = useLocation();

  if (!user.isLoggedIn) return null;

  return (
    <NavbarContainer>
      <NavbarLogo>
        <img src={TfalconImage} alt="" />
      </NavbarLogo>
      {user.isAdmin && location.pathname.includes('admin') && (
        <AdminTitle>Painel Admistrativo</AdminTitle>
      )}
      {user.isLoggedIn ? (
        <Button onClick={onLogoutHandler} type="primary">
          Logout
        </Button>
      ) : null}
    </NavbarContainer>
  );
};
