import React, { FC, useCallback, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Form } from '../../components/Form';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  IDefaultInput,
  IForm,
  IInputSelect,
  IServiceReport
} from '../../interfaces';

const inputStepper: IDefaultInput[] = [
  {
    name: 'data',
    label: 'Data',
    type: 'date',
    value: '',
    placeholder: 'data de serviço',
    required: true
  },
  {
    name: 'hora-inicio',
    label: 'Hora inicio',
    type: 'time',
    value: '',
    required: true
  },
  {
    name: 'hora-fim',
    label: 'Hora fim',
    type: 'time',
    value: '',
    required: true
  },
  {
    name: 'localização',
    label: 'Localização',
    type: 'select',
    value: '',
    data: [],
    placeholder: 'Selecione uma localização'
  },
  {
    name: 'ave',
    label: 'Ave',
    type: 'select',
    value: '',
    data: [],
    placeholder: 'Selecione uma ave'
  },
  {
    name: 'carro',
    label: 'Carro',
    type: 'select',
    value: '',
    data: [],
    placeholder: 'Selecione um carro'
  },
  {
    name: 'observações',
    label: 'Observações',
    type: 'textarea',
    value: '',
    placeholder: 'eventualidade / observações'
  }
];

const SIDEPANEL_WIDTH = '700px';

export const ServicesReport: FC<IServiceReport> = ({
  clientsData,
  birdsData,
  carsData
}) => {
  const {
    user: { displayName }
  } = useContext(AuthContext);
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const formInputs = useMemo(() => {
    const inputs = [...inputStepper];

    (inputs[3] as IInputSelect).data = clientsData.map((client) => ({
      label: client.nome,
      name: 'cliente',
      value: client.nome
    }));

    (inputs[4] as IInputSelect).data = birdsData.map((client) => ({
      label: client.nome,
      name: 'passaro',
      value: client.nome
    }));

    (inputs[5] as IInputSelect).data = carsData.map((car) => ({
      label: car.viatura,
      name: 'carro',
      value: car.viatura + ' ' + car.matricula
    }));

    return inputs;
  }, [birdsData, carsData, clientsData]);

  const onServicesReportHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      onLoadingHandler(true);
      try {
        app
          .collection('reports')
          .add({ ...data, utilizador: displayName })
          .then(() => {
            app
              .collection('counters')
              .doc('reports')
              .get()
              .then(async (doc) => {
                let count = (doc?.data()?.count || 0) + 1;

                await app.collection('counters').doc('reports').set({ count });
                onCloseSidepanelHandler(SIDEPANEL_WIDTH);
                onLoadingHandler(false);
                toast.success('Relatório registado com sucesso.');
              });
          });
      } catch (e) {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro ao registar o relatório.');
      }
    },
    [displayName, onCloseSidepanelHandler, onLoadingHandler]
  );

  return (
    <Form
      title="Relatório de Serviço"
      fields={formInputs}
      onSubmitCallback={onServicesReportHandler}
    />
  );
};
