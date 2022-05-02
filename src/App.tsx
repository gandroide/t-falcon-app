import React, { useState } from 'react';
import GlobalStyles from './styles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Home } from './pages/home/Home';
import ParticlesBg from 'particles-bg';
import { Form } from './components/form/Form';
import { Birds } from './pages/birds/Birds';
import { ImContrast, ImBrightnessContrast } from "react-icons/im";
import { Select } from './components/Select';
import { clientes, falcoeiros } from './data';
import  DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { InputGoup } from './components/inputs/Input';

const MAX_SIZE = 2;

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState('')
  const [selectClient, setSelectClient] = useState({});
  const [selectFalcoeiro, setSelectFalcoeiro] = useState({});
  const [selectBird, setSelectBird] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const onChangeTheme = () => {
    if (selectedTheme === 'light') setSelectedTheme('dark');
    else setSelectedTheme('light');
  }

  const onNextPageHandler = () => {
    setCurrentPage(prev => prev + 1);
  }

  const goBackPageHandler = () => {
    setCurrentPage(prev => prev - 1);
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


console.log(selectClient)
  return (
    <ThemeProvider theme={selectedTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      {/* <ParticlesBg type="cobweb" bg={true} /> */}
      <h3 className="test">T-Falcon</h3>
     <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '30px'}}>
      {selectedTheme === 'light' ?  <ImContrast size={20} onClick={onChangeTheme}/> : <ImBrightnessContrast size={20} onClick={onChangeTheme}/> }
     </div>
      <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', height: '90vh'}}>
        
        {currentPage === 1 && (
          <>
          <div>
            <InputGoup>
            <h2>Dia de Serviço</h2>
            
            <input type="date" value={date} onChange={onInputsHandler}/>
            </InputGoup>
            {/* <DatePicker
            selected={startDate} 
            onChange={(date: Date)=>{setStartDate(date)}}
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                dateFormat="Pp"
              /> */}
          </div>
          <div style={{width: '80%', marginTop: '-300px'}}>
            <h2>Local de Serviço</h2>
            <Form content={<Home selectValue={selectClient} setSelectClient={onSelectHandler}/>}/>
          </div>
          </>
        )}
        {currentPage === 2 && (
          <>
            <div style={{width: '80%', marginTop: '100px'}}>
              <Form content={<Birds 
              selectFalcoeiro={selectFalcoeiro}  
              selectBird={selectBird}
              setInputState={onSelectHandler}
              />} />
            </div>
          </>
        )}
        <div style={{display: 'flex', flexDirection: 'column'}}>

      <button onClick={onNextPageHandler}>Next Page</button>
      { currentPage > 1 ? <button onClick={goBackPageHandler}>Go Back</button>: undefined}
        </div>
        </div>
        {/* <Select options={clientes} /> */}
        {/* <Select options={falcoeiros} /> */}
    </ThemeProvider>
  );
};

export default App;
