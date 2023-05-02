import styled from 'styled-components';

interface StyledButtonProps {
  hasIcon: boolean;
}

export const StyledButton = styled.button`
  background-color: #085e3b;
  border-color: white;
  border-width: 0px;
  color: white;
  font-family: 'Baloo Tamma 2', cursive;
  position: relative;

  border: none;
  border-radius: 10rem;
  padding: 20px;
  margin: 10px 0 10px 0;

  font-size: 1.5rem;

  cursor: pointer;
  outline: none;
  overflow: hidden;
  transition: 0.3s;
`;

export const PrimaryButton = styled.button`
  background: #157416;
  color: #fff;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid #157416;
`;

export const SecondaryButton = styled.button`
  background: #fff;
  color: #157416;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid #157416;
`;

export const NewButton = styled.button<StyledButtonProps>`
  display: ${({ hasIcon }) => (hasIcon ? 'flex' : 'inline-flex')};
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 400;
  color: #157416;
  background-color: #fff;
  text-align: center;
  position: relative;
  border: 1px solid #157416;
  border-radius: 4px;
  padding: ${({ hasIcon }) => (hasIcon ? '10px' : '8px 16px')};
  flex-direction: ${({ hasIcon }) => (hasIcon ? 'column' : 'row')};
  font-size: 16px;

  ${({ hasIcon }) =>
    hasIcon &&
    `
    height: 150px;
    align-items: center;
    justify-content: center;
    width: 150px;

    & span {
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
    }

    & svg {
      width: 100%;
      height: 100%;
    }
  `}
`;
