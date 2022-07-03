import { AdminItem, AdminLink, AdminList, AdminNav } from './styled';

export const AdminNavbar = () => {
  return (
    <AdminNav>
      <AdminList>
        <AdminItem>
          <AdminLink to="/">Utilizadores</AdminLink>
        </AdminItem>
        <AdminItem>
          <AdminLink to="picagens">Picagens</AdminLink>
        </AdminItem>
        <AdminItem>
          <AdminLink to="aves">Aves</AdminLink>
        </AdminItem>
      </AdminList>
    </AdminNav>
  );
};
