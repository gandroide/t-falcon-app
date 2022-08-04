import { FC } from 'react';
import { IServiceReportDataFull } from '../../interfaces';

import {
  Container,
  Details,
  ItemContainer,
  ItemDetail,
  ItemLabel,
  ObservacoesContainer,
  SectionContainer,
  TitleContainer
} from './styles';

export const ServicesReportDetail: FC<IServiceReportDataFull> = ({
  report
}) => {
  return (
    <Container>
      <TitleContainer>
        <h1>Relatorio de Serviço</h1>
      </TitleContainer>
      <ItemContainer>
        <ItemLabel>Data:</ItemLabel>
        <ItemDetail>{report.data}</ItemDetail>
      </ItemContainer>
      <SectionContainer>
        <ItemContainer>
          <ItemLabel>Hora Inicio:</ItemLabel>
          <ItemDetail>{report['hora-inicio']}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Hora Fim:</ItemLabel>
          <ItemDetail>{report['hora-fim']}</ItemDetail>
        </ItemContainer>
      </SectionContainer>
      <SectionContainer>
        <ItemContainer>
          <ItemLabel>Colaborador:</ItemLabel>
          <ItemDetail>{report.colaborador}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Viatura:</ItemLabel>
          <ItemDetail>{report.viatura}</ItemDetail>
        </ItemContainer>
      </SectionContainer>
      <ItemContainer>
        <ItemLabel>Ave:</ItemLabel>
        <ItemDetail>{report.ave}</ItemDetail>
      </ItemContainer>
      <ItemContainer>
        <ObservacoesContainer>
          <ItemLabel>Observações:</ItemLabel>
          <ItemContainer>
            <Details>
              {report.observacoes ? (
                report.observacoes
              ) : (
                <span>Não existem observações</span>
              )}
            </Details>
          </ItemContainer>
        </ObservacoesContainer>
      </ItemContainer>
    </Container>
  );
};
