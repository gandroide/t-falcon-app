import { FC, useCallback, useContext, useMemo } from 'react';
import { Form } from '../../components/Form';
import { app, appTimestamp } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  IBirdWeightForm,
  IDefaultInput,
  IForm,
  IInputSelect
} from '../../interfaces';

const birdWeightData: IDefaultInput[] = [
  {
    label: 'Ave',
    name: 'nome',
    type: 'select',
    value: '',
    data: [],
    isRequired: true,
    hasError: false,
    placeholder: 'Selecione uma ave'
  },
  {
    label: 'Peso (gr)',
    name: 'peso',
    placeholder: 'Insira peso da ave',
    type: 'number',
    value: '',
    isRequired: true,
    hasError: false
  }
];

const SIDEPANEL_WIDTH = '500px';

export const BirdWeightForm: FC<IBirdWeightForm> = ({ birdsData }) => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const formInputs = useMemo(() => {
    const inputs = [...birdWeightData];
    (inputs[0] as IInputSelect).data = birdsData.map((bird) => ({
      label: bird.nome,
      name: 'nome',
      value: bird.nome
    }));
    return inputs;
  }, [birdsData]);

  const onRegisterBirdWeightHandler = useCallback<IForm['onSubmitCallback']>(
    (fields) => {
      onLoadingHandler(true);
      const birdId = birdsData.find((bird) => bird.nome === fields.nome)?.id;

      const selectedBird = birdsData.find(
        (bird) => bird.nome === fields['nome']
      );

      const data = {
        nome: selectedBird?.nome,
        identificação: selectedBird?.identificação,
        peso: fields['peso'],
        data: appTimestamp.fromDate(new Date())
      };

      app
        .collection('birds_weight')
        .add(data)
        .then(() => {
          app
            .collection('last_weighin')
            .doc(birdId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                app.collection('last_weighin').doc(birdId).update(data);
              } else {
                app.collection('last_weighin').doc(birdId).set(data);
              }

              app
                .collection('counters')
                .doc('birds_weight')
                .get()
                .then(async (doc) => {
                  let count = (doc?.data()?.count || 0) + 1;

                  await app
                    .collection('counters')
                    .doc('birds_weight')
                    .set({ count });
                });
              onLoadingHandler(false);
              onCloseSidepanelHandler(SIDEPANEL_WIDTH);
            });
        });
    },
    [birdsData, onCloseSidepanelHandler, onLoadingHandler]
  );

  return (
    <Form
      title="Registar peso da ave"
      fields={formInputs}
      onSubmitCallback={onRegisterBirdWeightHandler}
    />
  );
};
