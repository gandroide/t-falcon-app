import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0 10px 0;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const CircularContainer = styled.div`
  height: 250px;
  width: 250px;
  overflow: hidden;
`;

export const InitialImage = styled.img`
  width: 100%;
  border-radius: 15% 30%;
`;

//the children for this container have make width: 100%
