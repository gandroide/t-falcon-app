import React, { ComponentType } from 'react';
import { NewButton, StyledButton } from './style';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: ComponentType;
}

export const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => (
  <NewButton {...props}>
    {icon && <i className="material-icons">{icon}</i>}
    {children}
  </NewButton>
);
