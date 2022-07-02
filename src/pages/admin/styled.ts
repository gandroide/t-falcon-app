import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const AdminContainer = styled.div``;

export const AdminNav = styled.nav``;

export const AdminContent = styled.div`
  border: 1px solid #ddd;
`;

export const AdminList = styled.ul`
  display: flex;
`;

export const AdminItem = styled.li`
  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

export const AdminLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  border: 1px solid #ddd;
  border-bottom: none;
  padding: 4px 32px;
  color: #000;
  background: #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  &.active {
    background: #fff;
  }
`;
