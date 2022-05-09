import { Link } from 'react-router-dom';
import { Select } from '../../components/Select';
import { aves, falcoeiros } from '../../data';

export const Birds = ({selectFalcoeiro, selectBird, setInputState}: any) => {
  return (
    <>
      <div>
        <h2>Falcoeiro</h2>
        <Select selected={selectFalcoeiro} onChangeHandler={setInputState} options={falcoeiros}></Select>
      </div>
      <div>
        <h2>Bird</h2>
        <Select selected={selectBird} onChangeHandler={setInputState} options={aves}></Select>
      </div>
      <Link to="/">Go Back</Link>
    </>
  );
};
