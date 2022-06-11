import { FC, useCallback, useContext, useMemo } from 'react';
import { Form } from '../../components/Form';
import { app, appTimestamp } from '../../config/firebase';
import { SidepanelContext } from '../../context/Sidepanel';
import { IBirdWeightForm, IForm, IInput } from '../../interfaces';

const birdWeightData: IInput[] = [
  {
    label: 'Ave',
    name: 'nome',
    placeholder: 'Selecione uma ave',
    type: 'select',
    value: '',
    data: []
  },
  {
    label: 'Peso',
    name: 'peso',
    placeholder: 'Insira peso da ave',
    type: 'number',
    value: ''
  }
];

export const BirdWeightForm: FC<IBirdWeightForm> = ({ birdsData }) => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);
  const formInputs = useMemo(() => {
    const inputs = [...birdWeightData];
    inputs[0].data = birdsData.map((bird) => ({
      label: bird.nome,
      name: 'nome',
      value: bird.nome
    }));
    return inputs;
  }, [birdsData]);

  const onRegisterBirdWeightHandler = useCallback<IForm['onSubmitCallback']>(
    async (fields) => {
      const selectedBird = birdsData.find(
        (bird) => bird.nome === fields['nome']
      );

      const data = {
        nome: selectedBird?.nome,
        identificação: selectedBird?.identificação,
        peso: fields['peso'],
        data: appTimestamp.fromDate(new Date())
      };

      await app
        .collection('birds_weight')
        .add(data)
        .then(() => {
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
        });
      onCloseSidepanelHandler();
    },
    [birdsData, onCloseSidepanelHandler]
  );

  return (
    <Form
      title="Registar peso da ave"
      fields={formInputs}
      onSubmitCallback={onRegisterBirdWeightHandler}
    />
  );
};
