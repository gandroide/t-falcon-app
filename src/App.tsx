import { useContext, useEffect, useState } from 'react';
import GlobalStyles from './styles';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Admin } from './pages/admin';
import { Birds } from './pages/birds/Birds';
import { FormService } from './pages/formService';
import { defaultTheme } from './styles/theme';
import { Modal } from './components/Modal';
import { ModalContext } from './context/Modal';
import { SidePanel } from './components/SidePanel/Index';
import { SidepanelContext } from './context/Sidepanel';
import { AuthContext } from './context/Auth';

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
      <h3 className="test">T-Falcon</h3>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {isLoggedIn && !isAdmin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/pesagem" element={<Birds />} />
            <Route path="/relatorio" element={<FormService />}></Route>
          </>
        )}
        {isLoggedIn && isAdmin && <Route path="/" element={<Admin />} />}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
