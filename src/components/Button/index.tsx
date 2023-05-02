import React, { ComponentType } from 'react';
import { NewButton, PrimaryButton, SecondaryButton } from './style';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: ComponentType;
  type: 'primary' | 'secondary' | 'home';
}

export const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  children,
  type,
  ...props
}) => {
  if (type === 'primary') {
    return (
      <PrimaryButton {...props} type="button">
        {children}
      </PrimaryButton>
    );
  }

  if (type === 'secondary') {
    return (
      <SecondaryButton {...props} type="button">
        {children}
      </SecondaryButton>
    );
  }

  return (
    <NewButton {...props} hasIcon={!!Icon}>
      {Icon && <span className="material-icons">{<Icon />}</span>}
      {children}
    </NewButton>
  );
};
