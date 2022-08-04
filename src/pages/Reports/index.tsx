import { useCallback, useContext, useEffect, useState } from 'react';
import { RiArticleLine } from 'react-icons/ri';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  IServiceReportData,
  IServiceReportFull,
  ITableAction
} from '../../interfaces';
import { AdminContainer, AdminHeaderContainer } from '../../styles';
import { ServicesReportDetail } from '../ServicesReportDetails';

export const Reports = () => {
  const [reports, setReports] = useState<IServiceReportFull[]>([]);
  const [reportsCounter, setReportsCounter] = useState(0);
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);

  const onReportHandler = useCallback<
    ITableAction<IServiceReportData>['callback']
  >(
    (rowData) => {
      const reportItem = reports.find((report) => report.id === rowData.id)!;

      onOpenSidepanelHandler({
        isOpen: true,
        SidepanelChildren: <ServicesReportDetail report={reportItem} />,
        sidepanelWidth: '800px'
      });
    },
    [reports, onOpenSidepanelHandler]
  );

  useEffect(() => {
    onLoadingHandler(true);
    const reportsData: IServiceReportFull[] = [];

    app
      .collection('reports')
      //   .orderBy('data')
      .limit(10)
      .onSnapshot((onSnapshot) => {
        if (onSnapshot.empty) return;

        onSnapshot.forEach((doc) => {
          reportsData.push({
            id: doc.id,
            colaborador: doc.data().utilizador,
            cliente: doc.data()['localização'],
            data: doc.data().data,
            ave: doc.data().ave,
            viatura: doc.data().carro,
            'hora-fim': doc.data()['hora-fim'],
            'hora-inicio': doc.data()['hora-inicio'],
            observacoes: doc.data()['observações']
          });
        });

        app
          .collection('counters')
          .doc('reports')
          .onSnapshot((onSnapshot) => {
            if (!onSnapshot.exists) return;

            setReportsCounter(onSnapshot.data()?.count);
            setReports(reportsData);
            onLoadingHandler(false);
          });
      });
  }, [onLoadingHandler]);

  const data: IServiceReportData[] = reports.map((report) => ({
    id: report.id,
    colaborador: report.colaborador,
    cliente: report.cliente,
    data: report.data
  }));

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Relatorios de Serviço</h1>
      </AdminHeaderContainer>
      <Table
        count={reportsCounter}
        onTableRenderCallback={() => {}}
        onSearchCallback={() => {}}
        filterOptions={[]}
        data={data}
        tableActions={[{ callback: onReportHandler, icon: <RiArticleLine /> }]}
      />
    </AdminContainer>
  );
};
