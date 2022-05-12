import React, { ComponentType } from 'react'
import { StyledButton } from './style';


interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon?: ComponentType;
}

export const Button: React.FC<ButtonProps> = ({ icon, children, ...props}) => (
    <StyledButton {...props}>
        {icon && <i className="material-icons">{icon}</i>}
        {children}
    </StyledButton>
);