import { FC } from 'react';
import { IServiceReportDataFull } from '../../interfaces';

import {
  Container,
  GridContainer,
  ItemContainer,
  ItemDetail,
  ItemLabel,
  ObservacoesContainer,
  TitleContainer
} from './styles';

export const ServicesReportDetail: FC<IServiceReportDataFull> = ({
  report
}) => {
  return (
    <Container>
      <TitleContainer>
        <h2>Relatorio de Serviço</h2>
      </TitleContainer>
      <GridContainer>
        <ItemContainer>
          <ItemLabel>Colaborador:</ItemLabel>
          <ItemDetail>{report.colaborador}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Data:</ItemLabel>
          <ItemDetail>{report.data}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Viatura:</ItemLabel>
          <ItemDetail>
            {report.viatura.length ? report.viatura : '-'}
          </ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Hora Inicio:</ItemLabel>
          <ItemDetail>{report['hora-inicio']}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Ave:</ItemLabel>
          <ItemDetail>{report.ave.length ? report.ave : '-'}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Hora Fim:</ItemLabel>
          <ItemDetail>{report['hora-fim']}</ItemDetail>
        </ItemContainer>
        <ItemContainer>
          <ItemLabel>Cliente:</ItemLabel>
          <ItemDetail>{report.cliente}</ItemDetail>
        </ItemContainer>
      </GridContainer>

      <ObservacoesContainer>
        <ItemLabel>Observações:</ItemLabel>
        <ItemContainer>
          <ItemDetail>
            {report.observacoes ? (
              report.observacoes
            ) : (
              <span>Não existem observações</span>
            )}
          </ItemDetail>
        </ItemContainer>
      </ObservacoesContainer>
    </Container>
  );
};
