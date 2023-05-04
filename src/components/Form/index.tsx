import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  IForm,
  IInput,
  IInputCheckbox,
  IInputSelect,
  InputChangeHandler,
  InputFocusHandler,
  isInputCheckbox,
  isInputDate,
  isInputEvent,
  isInputSelect,
  isInputTime,
  isSelectOption,
  isTextarea,
  ISubmitData
} from '../../interfaces';
import { Button } from '../Button';
import { Select } from '../Select';
import {
  FormContainer,
  FormTitle,
  InputContainer,
  Input,
  InputLabel,
  InputContent,
  Textarea,
  InputError,
  FormCtaContainer
} from './style';

export const Form: FC<IForm> = ({ fields, onSubmitCallback, title }) => {
  const [formInputs, setFormInputs] = useState(fields);
  const [inputFocus, setInputFocus] = useState('');

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

  const onInputFocusHandler = useCallback<InputFocusHandler>(
    (inputName) => {
      setInputFocus(inputName);
    },
    [setInputFocus]
  );

  const onInputBlurHandler = useCallback(() => {
    setInputFocus('');
  }, [setInputFocus]);

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

    let isFormValid = true;
    const inputs = formInputs.map((input) => {
      if (input.isRequired) {
        if (
          (isInputSelect(input) || !isInputCheckbox(input)) &&
          !input.value.trim().length
        ) {
          input.hasError = true;
          isFormValid = false;
        }
      }
      return input;
    });

    if (!isFormValid) {
      setFormInputs(inputs);
      return;
    }

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
              placeholder={input.placeholder}
            />
            {input.hasError && (
              <InputError>Este campo é obrigatorio</InputError>
            )}
          </InputContainer>
        );
      }

      if (isInputCheckbox(input)) {
        return (
          <>
            <label>
              <input
                type={input.type}
                checked={input.checked}
                onChange={(e) => onChange(e, index)}
              />
              {input.label}
            </label>
            {input.hasError && (
              <InputError>Este campo é obrigatorio</InputError>
            )}
          </>
        );
      }

      if (isTextarea(input)) {
        return (
          <InputContainer>
            <InputLabel>{input.label}</InputLabel>
            <InputContent
              hasError={input.hasError}
              isFocused={input.name === inputFocus}
            >
              <Textarea
                rows={10}
                cols={40}
                onChange={(e) => onChange(e, index)}
                value={input.value}
                onFocus={() => onInputFocusHandler(input.name)}
                onBlur={onInputBlurHandler}
              />
            </InputContent>
            {input.hasError && (
              <InputError>Este campo é obrigatorio</InputError>
            )}
          </InputContainer>
        );
      }

      if (isInputTime(input)) {
        return (
          <InputContainer>
            <InputLabel>{input.label}</InputLabel>
            <InputContent
              hasError={input.hasError}
              isFocused={input.name === inputFocus}
            >
              <Input
                type={input.type}
                onChange={(e) => onChange(e, index)}
                value={input.value}
                onFocus={() => onInputFocusHandler(input.name)}
                onBlur={onInputBlurHandler}
              />
            </InputContent>
            {input.hasError && (
              <InputError>Este campo é obrigatorio</InputError>
            )}
          </InputContainer>
        );
      }

      if (isInputDate(input)) {
        return (
          <InputContainer>
            <InputLabel>{input.label}</InputLabel>
            <InputContent
              hasError={input.hasError}
              isFocused={input.name === inputFocus}
            >
              <Input
                type={input.type}
                onChange={(e) => onChange(e, index)}
                value={input.value}
                onFocus={() => onInputFocusHandler(input.name)}
                onBlur={onInputBlurHandler}
              />
            </InputContent>{' '}
            {input.hasError && (
              <InputError>Este campo é obrigatorio</InputError>
            )}
          </InputContainer>
        );
      }
      return (
        <InputContainer>
          <InputLabel>{input.label}</InputLabel>
          <InputContent
            hasError={input.hasError}
            isFocused={input.name === inputFocus}
          >
            <Input
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={(e) => onChange(e, index)}
              placeholder={input.placeholder}
              onFocus={() => onInputFocusHandler(input.name)}
              onBlur={onInputBlurHandler}
            />
          </InputContent>
          {input.hasError && <InputError>Este campo é obrigatorio</InputError>}
        </InputContainer>
      );
    });
  }, [
    formInputs,
    onChange,
    onInputBlurHandler,
    onInputFocusHandler,
    inputFocus
  ]);

  return (
    <FormContainer>
      {title && <FormTitle>{title}</FormTitle>}
      {inputsList}
      <FormCtaContainer>
        <Button type="primary" onClick={onSubmitHandler}>
          Submeter
        </Button>
      </FormCtaContainer>
    </FormContainer>
  );
};
