import { useContext, useState } from "react";
import GlobalStyles from "./styles";
import { ThemeProvider } from "styled-components";
import { Home } from "./pages/home/Home";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { Birds } from "./pages/birds/Birds";
import { FormService } from "./pages/formService";
import { defaultTheme } from "./styles/theme";

import { Modal } from "./components/Modal";
import { ModalContext } from "./context/Modal";

const App = () => {
  const [isloggedIn, setisloggedIn] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(false);

  const { modal } = useContext(ModalContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Modal {...modal} />
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
