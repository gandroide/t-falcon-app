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
import { appAuth } from './config/firebase';

const App = () => {
  const [isloggedIn, setisloggedIn] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(true);

  const { modal } = useContext(ModalContext);
  const { isSidepanelOpen, SidepanelChildren } = useContext(SidepanelContext);

  useEffect(() => {
    const unsub = appAuth.onAuthStateChanged((user) => {
      if (user) {
        setisloggedIn(true);
      }
      unsub();
    });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Modal {...modal} />
      <SidePanel openPanel={isSidepanelOpen}>{SidepanelChildren}</SidePanel>
      <h3 className="test">T-Falcon</h3>
      <Routes>
        {!isloggedIn && <Route path="/" element={<Login />} />}
        {isloggedIn && !admin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/pesagem" element={<Birds />} />
            <Route path="/relatorio" element={<FormService />}></Route>
          </>
        )}
        {isloggedIn && admin && <Route path="/" element={<Admin />} />}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
