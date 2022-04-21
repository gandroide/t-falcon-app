import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../../components/form/Form';
import { Container } from './Home.styles';
import Select from 'react-select';
import { clientes } from '../../data';

interface IOptions {
    clientes: {
        value: string;
        label: string;
    }[]
}


export const Home: FC = () => {
    const [clients, setClients] = useState<IOptions>()
    
    const customStyles = {
        option: (provided: any, state: { isSelected: any; }) => ({
          ...provided,
          borderBottom: '1px dotted pink',
          color: state.isSelected ? 'blue' : 'black',
          padding: 20,
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: 200,
        }),
        singleValue: (provided: any, state: { isDisabled: any; }) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }
    // setClients(clientes)

  return (
    <Container>
      <h3>dia de servicio</h3>
      {/* <Form props={dataTest} /> */}
      <Select styles={customStyles} options={clientes}  />
      <Link to="/birds">birds link</Link>
    </Container>
  );
};
