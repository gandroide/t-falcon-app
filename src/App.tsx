import { useContext } from 'react';
import GlobalStyles, { AppContainer } from './styles';
import styled, { ThemeProvider } from 'styled-components';
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
import { Player } from '@lottiefiles/react-lottie-player';

const App = () => {
  const { isLoading } = useContext(LoadingContext);
  const { modal } = useContext(ModalContext);
  const { isSidepanelOpen, SidepanelChildren, sidepanelWidth } =
    useContext(SidepanelContext);
  const {
    user: { isAuthReady }
  } = useContext(AuthContext);

  // useEffect(() => {
  //   app
  //     .collection('reports')
  //     .where('utilizador', '==', 'João Sousa')
  //     .get()
  //     .then((docs) => {
  //       console.log('-------------------------------------------------');
  //       docs.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     });
  // }, []);

  if (!isAuthReady) {
    return <Loading />;
  }

  const ContainerLottie = styled('div')`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  `;

  return (
    <ContainerLottie>
      <Player
        src="https://assets1.lottiefiles.com/packages/lf20_xjhwr9wv.json"
        autoplay
        loop
      />
    </ContainerLottie>
  );

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
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
