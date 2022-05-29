import React from 'react';
import { Select } from '../../components/Select';
import { aves } from '../../data';
import { Container } from './styles';

export const Pesagem = ({ selectBird, setInputState }: any) => {
  return (
    <Container>
      <div>Registrar Pesagem</div>
      <Select
        selected={selectBird}
        onChangeHandler={setInputState}
        options={aves}
      ></Select>
    </Container>
  );
};
