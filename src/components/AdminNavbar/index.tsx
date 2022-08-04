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
        <AdminItem>
          <AdminLink end to="clients">
            Clientes
          </AdminLink>
        </AdminItem>
        <AdminItem>
          <AdminLink end to="cars">
            Carros
          </AdminLink>
        </AdminItem>
        <AdminItem>
          <AdminLink end to="reports">
            Relatorios
          </AdminLink>
        </AdminItem>
      </AdminList>
    </AdminNav>
  );
};
