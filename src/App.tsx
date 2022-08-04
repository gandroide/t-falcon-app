import { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyles, { AppContainer } from './styles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import { Modal } from './components/Modal';
import { ModalContext } from './context/Modal';
import { SidePanel } from './components/SidePanel/Index';
import { SidepanelContext } from './context/Sidepanel';
import { AuthContext } from './context/Auth';
import { Navbar } from './components/Navbar';
import { AppRoutes } from './routes';
import { LoadingContext } from './context/Loading';
import { Loading } from './components/Loading';

const App = () => {
  const { isLoading } = useContext(LoadingContext);
  const { modal } = useContext(ModalContext);
  const { isSidepanelOpen, SidepanelChildren, sidepanelWidth } =
    useContext(SidepanelContext);
  const {
    user: { isLoggedIn, isAdmin, isAuthReady }
  } = useContext(AuthContext);

  if (!isAuthReady) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles isLoading={isLoading} />
      {isLoading && <Loading />}
      <Modal {...modal} />
      <SidePanel sidepanelWidth={sidepanelWidth} openPanel={isSidepanelOpen}>
        {SidepanelChildren}
      </SidePanel>
      <Navbar />
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
