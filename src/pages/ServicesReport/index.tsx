import React, { FC, useCallback, useContext, useMemo } from 'react';
import { Form } from '../../components/Form';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
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
    label: 'data',
    type: 'date',
    value: '',
    placeholder: 'data de serviço',
    required: true
  },
  {
    name: 'hora-inicio',
    label: 'hora inicio',
    type: 'time',
    value: '',
    required: true
  },
  {
    name: 'hora-fim',
    label: 'hora fim',
    type: 'time',
    value: '',
    required: true
  },
  {
    name: 'localização',
    label: 'localização',
    type: 'select',
    value: '',
    data: []
  },
  {
    name: 'ave',
    label: 'ave',
    type: 'select',
    value: '',
    data: []
  },
  {
    name: 'carro',
    label: 'carro',
    type: 'select',
    value: '',
    data: []
  },
  {
    name: 'observações',
    label: 'observações',
    type: 'textarea',
    value: '',
    placeholder: 'eventualidade / observações'
  }
];

export const ServicesReport: FC<IServiceReport> = ({
  clientsData,
  birdsData,
  carsData
}) => {
  const {
    user: { displayName }
  } = useContext(AuthContext);
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

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
                onCloseSidepanelHandler();
              });
          });
      } catch (e) {}
    },
    [displayName, onCloseSidepanelHandler]
  );

  return (
    <Form
      title="Relatório de Serviço"
      fields={formInputs}
      onSubmitCallback={onServicesReportHandler}
    />
  );
};
