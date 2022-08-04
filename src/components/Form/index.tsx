import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  IForm,
  IInput,
  IInputCheckbox,
  IInputSelect,
  InputChangeHandler,
  isInputCheckbox,
  isInputDate,
  isInputEvent,
  isInputSelect,
  isInputTime,
  isSelectOption,
  isTextarea,
  ISubmitData
} from '../../interfaces';
import { Select } from '../Select';
import {
  FormContainer,
  FormTitle,
  InputContainer,
  Input,
  InputLabel,
  InputContent,
  FormButton,
  Textarea
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
          <InputContainer>
            <InputLabel>{input.label}</InputLabel>
            <Select
              options={input.data}
              onChangeHandler={(e) => onChange(e, index)}
              selected
            />
          </InputContainer>
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

      if (isTextarea(input)) {
        return (
          <InputContainer>
            <InputLabel>{input.label}</InputLabel>
            <InputContent>
              <Textarea
                rows={10}
                cols={40}
                onChange={(e) => onChange(e, index)}
                value={input.value}
              />
            </InputContent>
          </InputContainer>
        );
      }

      if (isInputTime(input)) {
        return (
          <label>
            <input
              type={input.type}
              onChange={(e) => onChange(e, index)}
              value={input.value}
            />
            {input.label}
          </label>
        );
      }

      if (isInputDate(input)) {
        return (
          <InputContainer>
            <InputLabel>{input.label}</InputLabel>
            <InputContent>
              <Input
                type={input.type}
                onChange={(e) => onChange(e, index)}
                value={input.value}
              />
            </InputContent>
          </InputContainer>
        );
      }
      return (
        <InputContainer>
          <InputLabel>{input.label}</InputLabel>
          <InputContent>
            <Input
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={(e) => onChange(e, index)}
              placeholder={input.placeholder}
            />
          </InputContent>
        </InputContainer>
      );
    });
  }, [formInputs, onChange]);

  return (
    <FormContainer>
      {title && <FormTitle>{title}</FormTitle>}
      {inputsList}
      <FormButton onClick={onSubmitHandler}>Submeter</FormButton>
    </FormContainer>
  );
};
