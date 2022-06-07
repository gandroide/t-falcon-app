import { useContext, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AuthContext } from '../../context/Auth';
import {
  NavbarContainer,
  NavbarDropdownButton,
  NavbarDropdownButtonIcon,
  NavbarDropdownContainer,
  NavbarDropdownItem,
  NavbarDropdownLink,
  NavbarDropdownMenu,
  NavbarLogo
} from './styled';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const onDropdownOpenHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <NavbarContainer>
      <NavbarLogo>App Logo</NavbarLogo>
      <NavbarDropdownContainer>
        <NavbarDropdownButton onClick={onDropdownOpenHandler}>
          {user.displayName}
          <NavbarDropdownButtonIcon isOpen={isOpen}>
            <RiArrowDropDownLine />
          </NavbarDropdownButtonIcon>
          {isOpen && (
            <NavbarDropdownMenu>
              <NavbarDropdownItem>
                <NavbarDropdownLink to="/user_registry">
                  Minhas picagens
                </NavbarDropdownLink>
              </NavbarDropdownItem>
              <NavbarDropdownItem>
                <NavbarDropdownLink to="">
                  Trabalhos submetidos
                </NavbarDropdownLink>
              </NavbarDropdownItem>
            </NavbarDropdownMenu>
          )}
        </NavbarDropdownButton>
      </NavbarDropdownContainer>
    </NavbarContainer>
  );
};
