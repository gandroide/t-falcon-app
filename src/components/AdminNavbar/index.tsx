import {
  FaUser,
  FaUserEdit,
  FaEarlybirds,
  FaUsers,
  FaCarSide
} from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';

import {
  AdminBackdrop,
  AdminIcon,
  AdminItem,
  AdminLink,
  AdminList,
  AdminNav
} from './styled';

export const AdminNavbar = ({
  isOpen,
  onToggleAdminNavbarHandler
}: {
  isOpen: boolean;
  onToggleAdminNavbarHandler: (value?: boolean) => void;
}) => {
  return (
    <>
      <AdminBackdrop
        onClick={() => onToggleAdminNavbarHandler(false)}
        isOpen={isOpen}
      />
      <AdminNav isOpen={isOpen}>
        <AdminList>
          <AdminItem>
            <AdminLink
              end
              to=""
              onClick={() => onToggleAdminNavbarHandler(false)}
            >
              <AdminIcon>
                <FaUser />
              </AdminIcon>
              Utilizadores
            </AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink
              end
              to="picagens"
              onClick={() => onToggleAdminNavbarHandler(false)}
            >
              <AdminIcon>
                <FaUserEdit />
              </AdminIcon>
              Picagens
            </AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink
              end
              to="aves"
              onClick={() => onToggleAdminNavbarHandler(false)}
            >
              <AdminIcon>
                <FaEarlybirds />
              </AdminIcon>
              Aves
            </AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink
              end
              to="clients"
              onClick={() => onToggleAdminNavbarHandler(false)}
            >
              <AdminIcon>
                <FaUsers />
              </AdminIcon>
              Clientes
            </AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink
              end
              to="cars"
              onClick={() => onToggleAdminNavbarHandler(false)}
            >
              <AdminIcon>
                <FaCarSide />
              </AdminIcon>
              Carros
            </AdminLink>
          </AdminItem>
          <AdminItem>
            <AdminLink
              end
              to="reports"
              onClick={() => onToggleAdminNavbarHandler(false)}
            >
              <AdminIcon>
                <IoDocument />
              </AdminIcon>
              Relatorios
            </AdminLink>
          </AdminItem>
        </AdminList>
      </AdminNav>
    </>
  );
};
