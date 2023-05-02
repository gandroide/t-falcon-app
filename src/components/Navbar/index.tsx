import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';
import { Button } from '../Button';
import { NavbarContainer, NavbarLogo } from './styled';
import TfalconImage from '../../pages/login/tfalcon.jpg';
import { AdminTitle } from '../../pages/admin/styled';

export const Navbar = () => {
  const { user, onLogoutHandler } = useContext(AuthContext);

  if (!user.isLoggedIn) return null;

  return (
    <NavbarContainer>
      <NavbarLogo>
        <img src={TfalconImage} alt="" />
        {/* Tfalcon */}
      </NavbarLogo>
      {user.isAdmin && <AdminTitle>Painel Admistrativo</AdminTitle>}
      {user.isLoggedIn ? (
        <Button onClick={onLogoutHandler} type="primary">
          Logout
        </Button>
      ) : null}
    </NavbarContainer>
  );
};
