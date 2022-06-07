import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface IDropdown {
  isOpen: boolean;
}

export const NavbarContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const NavbarLogo = styled.div``;

export const NavbarDropdownContainer = styled.div`
  position: relative;
`;

export const NavbarDropdownButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
`;

export const NavbarDropdownButtonIcon = styled.span<IDropdown>`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  transform: ${({ isOpen }) => isOpen && 'rotate(180deg)'};
  transition: transform 0.2s linear;
`;

export const NavbarDropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: #ccc;
  border-radius: 4px;
`;

export const NavbarDropdownItem = styled.li`
  &:not(:last-of-type) {
    border-bottom: 1px solid #bbb;
  }
`;

export const NavbarDropdownLink = styled(NavLink)`
  white-space: nowrap;
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: #fff;
`;
