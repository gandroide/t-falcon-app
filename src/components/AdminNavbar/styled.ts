import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const AdminNav = styled.nav``;

export const AdminList = styled.ul`
  display: flex;
  border-bottom: 2px solid #eee;
`;

export const AdminItem = styled.li``;

export const AdminLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  border-bottom: none;
  padding: 4px 32px;
  color: #000;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-weight: bold;
  position: relative;
  top: 2px;

  &.active {
    background: #fff;
    color: red;
    border-bottom: 2px solid red;
  }
`;
