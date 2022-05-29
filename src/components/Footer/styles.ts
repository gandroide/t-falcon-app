import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.common.black};
  color: white;
  text-align: center;
  height: 20px;
`;
