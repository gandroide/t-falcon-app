import { FC, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

interface IProtectedRoute {
  isClosedRoute?: boolean;
  isAdminRoute?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({
  isAdminRoute,
  isClosedRoute
}) => {
  const { user } = useContext(AuthContext);

  if (isClosedRoute && !user.isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (isAdminRoute && !user.isAdmin) {
    return <Navigate to="/home" />;
  }

  // if (isAdminRoute && user.isAdmin) {
  //   return <Navigate to="/admin" />;
  // }

  return <Outlet />;
};
