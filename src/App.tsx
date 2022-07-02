import { useContext, useEffect, useState } from 'react';
import GlobalStyles, { AppContainer } from './styles';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Admin } from './pages/admin';
import { Birds } from './pages/Birds';
import { FormService } from './pages/formService';
import { defaultTheme } from './styles/theme';
import { Modal } from './components/Modal';
import { ModalContext } from './context/Modal';
import { SidePanel } from './components/SidePanel/Index';
import { SidepanelContext } from './context/Sidepanel';
import { AuthContext } from './context/Auth';
import { Navbar } from './components/Navbar';
import { UserRegistry } from './pages/UserRegistry';
import { UsersRegistry } from './pages/UsersRegistry';
import { Users } from './pages/Users';

const App = () => {
  const { modal } = useContext(ModalContext);
  const { isSidepanelOpen, SidepanelChildren } = useContext(SidepanelContext);
  const {
    user: { isLoggedIn, isAdmin, isAuthReady }
  } = useContext(AuthContext);

  if (!isAuthReady) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        Loading ...
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Modal {...modal} />
      <SidePanel openPanel={isSidepanelOpen}>{SidepanelChildren}</SidePanel>
      <Navbar />
      <AppContainer>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<Login />} />}
          {isLoggedIn && !isAdmin && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/pesagem" element={<Birds />} />
              <Route path="/relatorio" element={<FormService />} />
              <Route path="/user_registry" element={<UserRegistry />} />
            </>
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/" element={<Admin />}>
              <Route path="picagens" element={<UsersRegistry />} />
              <Route path="/" element={<Users />} />
            </Route>
          )}
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
