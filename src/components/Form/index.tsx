import React, { FC, useState } from 'react';
import reactSelect from 'react-select';
import { IForm, ISubmitData } from '../../interfaces';
import { Button } from '../Button';
import { FormContainer, InputsList } from './style';

export const Form: FC<IForm> = ({ fields, onSubmitCallback }) => {
  const [formInputs, setFormInputs] = useState(fields);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    const inputIndex = formInputs.findIndex((element) => element.name === name);
    formInputs[inputIndex].value = value;
    setFormInputs([...formInputs]);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ISubmitData = {};

    formInputs.forEach(({ name, value }) => {
      data[name] = value;
    });

    onSubmitCallback(data);
  };

  return (
    <FormContainer>
      {formInputs.map((i) => {
        return (
          <InputsList key={i.name}>
            <label>{i.label}</label>
            <input
              name={i.name}
              onChange={onChange}
              type={i.type}
              value={i.value}
              placeholder={i.placeholder}
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
