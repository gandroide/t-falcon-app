import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Home } from './pages/home/Home';
import { Birds } from './pages/birds/Birds';
import ParticlesBg from 'particles-bg';

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const onChangeTheme = () => {
    if (selectedTheme === 'light') setSelectedTheme('dark');
    else setSelectedTheme('light');
  }

  return (
    <ThemeProvider theme={selectedTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      {/* <ParticlesBg type="cobweb" bg={true} /> */}
      <h3 className="test">T-Falcon</h3>
      <button onClick={onChangeTheme}>fgdgf</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="birds" element={<Birds />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
