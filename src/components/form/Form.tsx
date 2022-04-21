import { useEffect, useState } from 'react';

interface IFormProps {
  props: object[];
}

type SFP = IFormProps | null;

const dataTest = [
  {
    title: 'Local de Serviço',
    input: 'test',
  },
  {
    title: 'Falcoeiro',
    input: 'test',
  },
];

export const Form = (props: IFormProps) => {
  const [inputs, setInputs] = useState<SFP>();

  useEffect(() => {
    if (props) {
      setInputs(props);
    }
  }, [props]);
  console.log(props?.props);

  return (
    <>
      {/* {props?.props.map((value, key) => { */}
      <form action="">
        {/* return (
          <> */}
        <h3>{}</h3>
        {/* <input key={Math.random()} type="text">
              {}
            </input> */}
        {/* </>
          ); */}
      </form>
      {/* }, [])} */}
      {/* <input type="text" /> */}
    </>
  );
};
