import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CheckboxContainer, CheckboxItem, MenuItem } from './styled';
import { Container } from './styled';

const InputStepper = [
  [
    {
      name: 'data',
      label: 'data',
      type: 'date',
      value: '',
      placeholder: 'data de serviço'
    },
    {
      name: 'hora inicio',
      label: 'hora inicio',
      type: 'date',
      value: '',
      placeholder: 'hora de serviço'
    },
    {
      name: 'hora fim',
      label: 'hora fim',
      type: 'date',
      value: '',
      placeholder: 'hora de serviço'
    }
  ],
  [
    {
      name: 'localização',
      label: 'localização',
      type: 'text',
      value: '',
      placeholder: 'localização do trabalho'
    },
    {
      name: 'ave',
      label: 'ave',
      type: 'text',
      value: '',
      placeholder: 'introduza ave'
    },
    {
      name: 'carro',
      label: 'carro',
      type: 'text',
      value: '',
      placeholder: 'selecione o carro utilizado'
    }
  ],
  [
    {
      name: 'observações',
      label: 'observações',
      type: 'text',
      value: '',
      placeholder: 'eventualidade / observações'
    }
  ]
];

export const FormService = () => {
  const [step, setStep] = useState(0);

  const LinkComponent = {
    display: 'inline-block',
    padding: '0.7em 1.7em',
    margin: '0 0.3em 0.3em 0',
    minWidth: '160px',
    borderStyle: 'hidden',
    borderRadius: '0.5em',
    textDecoration: 'none',
    fontWeight: '400',
    color: '#ffffff',
    backgroundColor: '#3369ff',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const setpFormHandler = (direction: number) => {
    setStep(direction);
  };

  return (
    <Container>
      <MenuItem>FormService</MenuItem>
      <textarea rows={10} cols={40} />
      <MenuItem>
        <Button onClick={() => setpFormHandler(1)}>Next</Button>
      </MenuItem>
      {step === 0 ? undefined : (
        <MenuItem>
          <Button onClick={() => setpFormHandler(-1)}>Back</Button>
        </MenuItem>
      )}
      <MenuItem>
        <Link style={LinkComponent} to="/">
          Cancelar
        </Link>
      </MenuItem>
    </Container>
  );
};
