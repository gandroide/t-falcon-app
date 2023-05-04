import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const AdminNav = styled.nav<{ isOpen: boolean }>`
  width: 100%;
  max-width: 300px;

  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? 0 : '-100%')};
  width: 100%;
  height: 100vh;
  z-index: 100;
  background: #f9fafb;
  transition: left 500ms linear;

  @media screen and (min-width: 992px) {
    position: unset;
    width: 250px;
    max-width: unset;
    z-index: unset;
    height: unset;
    min-height: 585px;
  }
`;

export const AdminBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transition: opacity 500ms linear;
`;

export const AdminList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  width: 100%;
  height: 100%;
  background: #1574164d;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const AdminItem = styled.li``;

export const AdminLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  border-bottom: none;
  padding: 6px 15px;
  color: #fff;
  font-weight: bold;
  position: relative;
  font-size: 16px;
  display: flex;
  align-items: center;
  border-right: 6px solid transparent;
  padding: 15px;

  &.active {
    color: #157416;
    border-right: 6px solid #157416;
  }

  @media screen and (min-width: 992px) {
    padding: 8px 15px;
  }
`;

export const AdminIcon = styled.span`
  font-size: 20px;
  width: 30px;
  display: flex;
  align-items: center;
`;
