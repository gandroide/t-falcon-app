import React, { FC, useCallback, useMemo, useState } from 'react';
import { IForm, InputChangeHandler, ISubmitData } from '../../interfaces';
import { Button } from '../Button';
import { Select } from '../Select';
import {
  FormContainer,
  FormTitle,
  InputWithSpacement,
  LabelComponent,
  SpacementContiner
} from './style';

export const Form: FC<IForm> = ({ fields, onSubmitCallback, title }) => {
  const [formInputs, setFormInputs] = useState(fields);

  const onChange = useCallback<InputChangeHandler>(
    (e) => {
      let value = '';
      let name = '';

      if ('currentTarget' in e) {
        value = e.currentTarget.value;
        name = e.currentTarget.name;
      } else {
        value = e.value;
        name = e.name;
      }

      const inputIndex = formInputs.findIndex(
        (element) => element.name === name
      );
      formInputs[inputIndex].value = value;
      setFormInputs([...formInputs]);
    },
    [formInputs]
  );

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ISubmitData = {};

    formInputs.forEach(({ name, value }) => {
      data[name] = value;
    });

    onSubmitCallback(data);
  };

  const inputsList = useMemo(() => {
    return formInputs.map((input) => {
      if (input.data) {
        return (
          <Select options={input.data} onChangeHandler={onChange} selected />
        );
      } else {
        return (
          <SpacementContiner>
            <LabelComponent>{input.label}</LabelComponent>
            <InputWithSpacement
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={onChange}
              placeholder={input.placeholder}
            />
          </SpacementContiner>
        );
      }
    });
  }, [formInputs, onChange]);

  return (
    <FormContainer>
      {title && <FormTitle>{title}</FormTitle>}
      {inputsList}
      <SpacementContiner>
        <Button onClick={onSubmitHandler}>Send</Button>
      </SpacementContiner>
    </FormContainer>
  );
};
