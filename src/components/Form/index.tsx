import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  IForm,
  IInput,
  IInputCheckbox,
  IInputSelect,
  InputChangeHandler,
  isInputCheckbox,
  isInputEvent,
  isInputSelect,
  isSelectOption,
  ISubmitData
} from '../../interfaces';
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
    (e, index) => {
      const selectedInput = formInputs[index];

      if (isInputSelect(selectedInput) && isSelectOption(e)) {
        (formInputs[index] as IInputSelect).value = e.value;
      }

      if (isInputCheckbox(selectedInput) && isInputEvent(e)) {
        (formInputs[index] as IInputCheckbox).checked = e.currentTarget.checked;
      }

      if (!isInputCheckbox(selectedInput) && isInputEvent(e)) {
        (formInputs[index] as IInput).value = e.currentTarget.value;
      }

      setFormInputs([...formInputs]);
    },
    [formInputs]
  );

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ISubmitData = {};

    formInputs.forEach((input) => {
      if (isInputSelect(input) || !isInputCheckbox(input)) {
        data[input.name] = input.value;
      }

      if (isInputCheckbox(input)) {
        data[input.name] = input.checked.toString();
      }
    });

    onSubmitCallback(data);
  };

  const inputsList = useMemo(() => {
    return formInputs.map((input, index) => {
      if (isInputSelect(input)) {
        return (
          <Select
            options={input.data}
            onChangeHandler={(e) => onChange(e, index)}
            selected
          />
        );
      }

      if (isInputCheckbox(input)) {
        return (
          <label>
            <input type={input.type} checked={input.checked} />
            {input.label}
          </label>
        );
      }

      return (
        <SpacementContiner>
          <LabelComponent>{input.label}</LabelComponent>
          <InputWithSpacement
            type={input.type}
            name={input.name}
            value={input.value}
            onChange={(e) => onChange(e, index)}
            placeholder={input.placeholder}
          />
        </SpacementContiner>
      );
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
