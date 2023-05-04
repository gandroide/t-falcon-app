import { useContext } from 'react';
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
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const App = () => {
  const { isLoading } = useContext(LoadingContext);
  const { modal } = useContext(ModalContext);
  const { isSidepanelOpen, SidepanelChildren, sidepanelWidth } =
    useContext(SidepanelContext);
  const {
    user: { isAuthReady }
  } = useContext(AuthContext);
  const location = useLocation();

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
      <AppContainer isAdmin={location.pathname.includes('admin')}>
        <AppRoutes />
      </AppContainer>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
