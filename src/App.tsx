import { useContext, useState } from 'react';
import GlobalStyles from './styles';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages/home/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './pages/login';
import { Admin } from './pages/admin';
import { Birds } from './pages/birds/Birds';
import { FormService } from './pages/formService';
import { defaultTheme } from './styles/theme';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Modal } from './components/Modal';
import { ModalContext } from './context/Modal';
import { SidePanel } from './components/SidePanel/Index';
import { SidepanelContext } from './context/Sidepanel';
import { TForm } from './components/Form';
import { IInput } from './interfaces';

const App = () => {
  const [isloggedIn, setisloggedIn] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(false);

  let location = useLocation();

  const { modal } = useContext(ModalContext);
  const { isSidepanelOpen, SidepanelChildren } = useContext(SidepanelContext);
  const array: IInput[] = [
    {
      id: '1',
      name: 'alejandro',
      label: 'testando',
      type: 'text',
      value: 'test'
    },
    {
      id: '2',
      name: 'filipe',
      label: 'feje programador',
      type: 'text',
      value: 'test2'
    },
    {
      id: '3',
      name: 'falcoeiro',
      label: 'empregado de T-falcon',
      type: 'text',
      value: 'test3'
    }
  ];

  const onSubmit = (array: IInput[]) => {
    console.log(array);
  };
  // if (true) {
  //   return <Login />;
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Modal {...modal} />
      <SidePanel openPanel={isSidepanelOpen}>{SidepanelChildren}</SidePanel>
      <h3 className="test">T-Falcon</h3>
      <TransitionGroup component={null}>
        <CSSTransition key={location.pathname} classNames="fade" timeout={250}>
          <Routes location={location}>
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
        </CSSTransition>
      </TransitionGroup>
    </ThemeProvider>
  );
};

export default App;
