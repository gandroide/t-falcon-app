import React from 'react';
import { Select } from '../../components/Select';
import { clientes } from '../../data'
import { Container } from './Home.styles'

export const Home = ({setSelectClient, selectValue}: any) => {
console.log(selectValue, "selectValue")
  return (
    <Container>
      <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select>
    </Container>
  )
}
