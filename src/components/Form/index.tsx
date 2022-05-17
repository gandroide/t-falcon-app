import React, { FC, useState } from 'react';
import reactSelect from 'react-select';
import { IForm } from '../../interfaces';
import { Button } from '../Button';
import { FormContainer, InputsList } from './style';

export const TForm: FC<IForm> = ({ fields, onSubmitCallback }) => {
  const [formInputs, setFormInputs] = useState(fields);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    const inputIndex = formInputs.findIndex((element) => element.name === name);
    formInputs[inputIndex].value = value;
    setFormInputs([...formInputs]);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    onSubmitCallback(formInputs);
  };

  return (
    <FormContainer>
      {formInputs.map((i) => {
        return (
          <InputsList key={i.id}>
            <label>{i.label}</label>
            <input
              name={i.name}
              onChange={onChange}
              type={i.type}
              value={i.value}
            />
          </InputsList>
        );
      })}
      <div>
        <Button onClick={onSubmitHandler}>Send</Button>
      </div>
    </FormContainer>
  );
};
