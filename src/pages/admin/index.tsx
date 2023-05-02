import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../../components/AdminNavbar';
import { FooterBar } from '../../components/Footer';
import { AdminContainer, AdminContent, AdminMainContent } from './styled';

export const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleAdminNavbarHandler = (value?: boolean) => {
    if (typeof value === 'boolean') {
      setIsOpen(value);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      <AdminContainer>
        <AdminMainContent>
          <AdminNavbar
            isOpen={isOpen}
            onToggleAdminNavbarHandler={onToggleAdminNavbarHandler}
          />
          <AdminContent>
            <Outlet
              context={{ toggleAdminNavbar: onToggleAdminNavbarHandler }}
            />
          </AdminContent>
        </AdminMainContent>
      </AdminContainer>
      <FooterBar />
    </>
  );
};
