import React, { useEffect, useState } from 'react';
import GlobalStyles from './styles';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages/home/Home';
import { ImContrast, ImBrightnessContrast } from "react-icons/im";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Admin } from './pages/admin';
import { Birds } from './pages/birds/Birds';
import { FormService } from './pages/formService';
import { SidePanel } from './components/SidePanel/Index';
import { defaultTheme } from './styles/theme';

const MAX_SIZE = 2;

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState('')
  const [selectClient, setSelectClient] = useState({});
  const [selectFalcoeiro, setSelectFalcoeiro] = useState({});
  const [selectBird, setSelectBird] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [isloggedIn, setisloggedIn] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(false);
  const [openPanel, setOpenPanel] = useState(false)


  const onChangeTheme = () => {
    if (selectedTheme === 'light') setSelectedTheme('dark');
    else setSelectedTheme('light');
  }

  const onInputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const onSelectHandler = (option: {label: string, value: string, name: string}) => {
    if(option.name === 'clients'){
      setSelectClient(option)
    }
    if(option.name === 'falcoeiros'){
      setSelectFalcoeiro(option)
    }
    if(option.name === 'birds'){
      setSelectBird(option)
    }
    console.log(option,"option")
  }

  const handleOnChange = () => {
    setOpenPanel(prev => !prev)
  }

  return (
    <ThemeProvider theme={defaultTheme} >
      <GlobalStyles />
      <h3 className="test">T-Falcon</h3>
      <button onClick={handleOnChange}>Panel</button>
     {/* <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '30px'}}>
      {selectedTheme === 'light' ?  <ImContrast size={20} onClick={onChangeTheme}/> : <ImBrightnessContrast size={20} onClick={onChangeTheme}/> }
     </div> */}
     <SidePanel openPanel={openPanel} setOpenPanel={setOpenPanel}/>
    
      <Routes>
        {!isloggedIn && <Route path="/" element={<Login />}/>}
        {isloggedIn && !admin && (
        <>
        <Route path="/" element={<Home />} />
        <Route path="/pesagem" element={<Birds />} />
        <Route path="/relatorio" element={<FormService />}></Route>
        </>
        )}
        {isloggedIn && admin && <Route path='/' element={<Admin />}/>}

      </Routes>
        {/* <NavLink to="">Peencher Relatorio</NavLink> */}
    </ThemeProvider>
  );
};

export default App;
