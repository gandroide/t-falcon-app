import styled from 'styled-components';

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

export const NewButton = styled.button`
  display: inline-block;
  padding: 0.7em 1.7em;
  margin: 0 0.3em 0.3em 0;
  min-width: 160px;
  border-style: hidden;
  border-radius: 0.5em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 400;
  color: #ffffff;
  background-color: #3369ff;
  text-align: center;
  position: relative;

  @media all and (max-width: 30em) {
    a.button7 {
      display: block;
      margin: 0.4em auto;
    }
  }
`;
