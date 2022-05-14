import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '../../components/Select';
import { SidepanelContext } from '../../context/Sidepanel';
import { aves, falcoeiros } from '../../data';

const BirdsForm = ({ selectFalcoeiro, selectBird, setInputState }: any) => {
  return (
    <div>
      <div>
        <h2>Falcoeiro</h2>
        <Select
          selected={selectFalcoeiro}
          onChangeHandler={setInputState}
          options={falcoeiros}
        ></Select>
      </div>
      <div>
        <h2>Bird</h2>
        <Select
          selected={selectBird}
          onChangeHandler={setInputState}
          options={aves}
        ></Select>
      </div>
    </div>
  );
};

export const Birds = ({ selectFalcoeiro, selectBird, setInputState }: any) => {
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);

  const openPanel = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: (
        <BirdsForm
          selectFalcoeiro={selectFalcoeiro}
          selectBird={selectBird}
          setInputState={setInputState}
        />
      )
    });
  };
  return (
    <>
      <button onClick={openPanel}>openPanel</button>
      <Link to="/">Go Back</Link>
    </>
  );
};
