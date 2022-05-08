import { Link } from 'react-router-dom';
import { Select } from '../../components/Select';
import { clientes } from '../../data'
import { Container } from './Home.styles'

export const Home = ({setSelectClient, selectValue}: any) => {
console.log(selectValue, "selectValue")
  return (
    <Container>
      <h3>Home</h3>
      <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select>
      <Link to="/">Back</Link>
    </Container>
  )
}
