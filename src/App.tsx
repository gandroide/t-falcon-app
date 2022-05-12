import { useState } from "react";
import GlobalStyles from "./styles";
import { ThemeProvider } from "styled-components";
import { Home } from "./pages/home/Home";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { Birds } from "./pages/birds/Birds";
import { FormService } from "./pages/formService";
import { defaultTheme } from "./styles/theme";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const App = () => {
  const [isloggedIn, setisloggedIn] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(false);

  let location = useLocation();
  // const onSelectHandler = (option: {label: string, value: string, name: string}) => {
  //   if(option.name === 'clients'){
  //     setSelectClient(option)
  //   }
  //   if(option.name === 'falcoeiros'){
  //     setSelectFalcoeiro(option)
  //   }
  //   if(option.name === 'birds'){
  //     setSelectBird(option)
  //   }
  //   console.log(option,"option")
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
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
