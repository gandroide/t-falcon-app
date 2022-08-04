import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Admin } from '../pages/admin';
import { Birds } from '../pages/Birds';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login';
import { UserRegistry } from '../pages/UserRegistry';
import { Users } from '../pages/Users';
import { UsersRegistry } from '../pages/UsersRegistry';
import { Clients } from '../pages/Clients';
import { Cars } from '../pages/Cars';
import { Reports } from '../pages/Reports';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute isClosedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/pesagem" element={<Birds />} />
      <Route path="/user_registry" element={<UserRegistry />} />
      <Route
        path="/admin"
        element={<ProtectedRoute isAdminRoute isClosedRoute />}
      >
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Users />} />
          <Route path="picagens" element={<UsersRegistry />} />
          <Route path="aves" element={<Birds />} />
          <Route path="clients" element={<Clients />} />
          <Route path="cars" element={<Cars />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>
    </Routes>
  );
};
