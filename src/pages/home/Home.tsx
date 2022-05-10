import { Link } from 'react-router-dom';
import { Select } from '../../components/Select';
import { clientes } from '../../data'
import { Container } from './Home.styles'

export const Home = ({setSelectClient, selectValue}: any) => {
  return (
    <Container>
      <h3>Home</h3>
      <button>Registrar Picagem</button>
      <Link to="/pesagem">Registrar Ave</Link>
      <Link to="/relatorio">Relatorio de Serviço</Link>
      {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
      <Link to="/">Back</Link>
    </Container>
  )
}
