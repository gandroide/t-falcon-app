import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '../../components/Select';
import { SidePanel } from '../../components/SidePanel/Index';
import { aves, falcoeiros } from '../../data';

export const Birds = ({selectFalcoeiro, selectBird, setInputState}: any) => {
  const [test, setTest] = useState(false)

  const handleClose = () => {
    setTest(!test)
  }
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
      <SidePanel openPanel={test} setOpenPanel={handleClose}>
        <h3>test</h3>
        <h3>testando</h3>
      </SidePanel>
      <Link to="/">Go Back</Link>
    </>
  );
};
