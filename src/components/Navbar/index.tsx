import { useContext, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AuthContext } from '../../context/Auth';
import { Button } from '../Button';
import {
  NavbarContainer,
  NavbarDropdownButton,
  NavbarDropdownButtonIcon,
  NavbarDropdownContainer,
  NavbarDropdownItem,
  // NavbarDropdownLink,
  NavbarDropdownMenu,
  NavbarLogo
} from './styled';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, onLogoutHandler } = useContext(AuthContext);

  const onDropdownOpenHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <NavbarContainer>
      <NavbarLogo>App Logo</NavbarLogo>
      {user.isLoggedIn ? (
        <NavbarDropdownContainer>
          <NavbarDropdownButton onClick={onDropdownOpenHandler}>
            {user.displayName}
            <NavbarDropdownButtonIcon isOpen={isOpen}>
              <RiArrowDropDownLine />
            </NavbarDropdownButtonIcon>
            {isOpen && !user.isAdmin ? (
              <NavbarDropdownMenu>
                {/* <NavbarDropdownItem>
                  <NavbarDropdownLink to="/user_registry">
                    Minhas picagens
                  </NavbarDropdownLink>
                </NavbarDropdownItem>
                <NavbarDropdownItem>
                  <NavbarDropdownLink to="">
                    Trabalhos submetidos
                  </NavbarDropdownLink>
                </NavbarDropdownItem> */}

                <NavbarDropdownItem>
                  <Button onClick={onLogoutHandler}>Logout</Button>
                </NavbarDropdownItem>
              </NavbarDropdownMenu>
            ) : (
              isOpen && (
                <NavbarDropdownButton>
                  <NavbarDropdownMenu>
                    <NavbarDropdownItem>
                      <Button onClick={onLogoutHandler}>Logout</Button>
                    </NavbarDropdownItem>
                  </NavbarDropdownMenu>
                </NavbarDropdownButton>
              )
            )}
          </NavbarDropdownButton>
        </NavbarDropdownContainer>
      ) : null}
    </NavbarContainer>
  );
};
