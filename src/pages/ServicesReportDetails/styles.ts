import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const TitleContainer = styled.h2`
  margin-bottom: 40px;
  color: #157416;
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ItemLabel = styled.p`
  font-size: 16px;
`;

export const ItemDetail = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const ObservacoesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-size: 2rem;
  margin-top: 40px;
  padding: 0 40px;
`;

export const Details = styled.span`
  /* width: 60%; */
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  padding: 0 40px;
  gap: 20px;
`;
