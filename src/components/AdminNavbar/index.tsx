import { AdminItem, AdminLink, AdminList, AdminNav } from './styled';

export const AdminNavbar = () => {
  return (
    <AdminNav>
      <AdminList>
        <AdminItem>
          <AdminLink end to="">
            Utilizadores
          </AdminLink>
        </AdminItem>
        <AdminItem>
          <AdminLink end to="picagens">
            Picagens
          </AdminLink>
        </AdminItem>
        <AdminItem>
          <AdminLink end to="aves">
            Aves
          </AdminLink>
        </AdminItem>
      </AdminList>
    </AdminNav>
  );
};
