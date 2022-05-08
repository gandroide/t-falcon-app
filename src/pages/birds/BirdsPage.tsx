import { child, onValue, push, ref, update, remove, query, equalTo, limitToFirst, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';

const birdData = {
    name: '',
    ref: ''
}

type BirdUpdate = {
    [key: string]: typeof birdData;
}

type Bird = {
    id: string;
    name: string;
    ref: string;
}

export const BirdsPage = () => {
    const [bird, setBird] = useState({...birdData});
    const [birds, setBirds] = useState<Bird[]>();
    const [isLoading, setIsLoading] = useState(true);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBird(prevValue => ({...prevValue, [name]: value}))
    }

    const onAddBirdHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const birdKey = push(child(ref(db), 'aves')).key;

        const updates: BirdUpdate = {};
        updates['/aves/' + birdKey] = bird;

        update(ref(db), updates);
        setBird({...birdData})
    }

    const onRemoveBirdHandler = (id: string) => {
        const birdRef = ref(db, 'aves/' + id);
        remove(birdRef);
    }

    useEffect(() => {

        const birdsRef = ref(db, 'aves');
        onValue(birdsRef, (snapshot) => {
            const values = snapshot.val();
            const birdsData: Bird[] = [];

            for (let value in values) {
                birdsData.push({id: value, ...values[value]});
            }

            setBirds(birdsData);
            setIsLoading(false);
        })

    }, []);

    return (
        <div>
            <form>
                <input type="text" name="name" value={bird.name} onChange={onChangeHandler} />
                <input type="text" name="ref" value={bird.ref} onChange={onChangeHandler} />
                <button onClick={onAddBirdHandler}>Adicionar Ave</button>
            </form>
            <div>
                {
                    isLoading
                        ? <p>Loading Birds Data...</p>
                        : birds && birds.length
                            ? birds.map(({name, id}) => (
                                <div key={id}>
                                    <p>{name}</p>
                                    <button onClick={() => onRemoveBirdHandler(id)}>Remover</button>
                                    {/* <button onClick={() => }>Editar</button> */}
                                </div>
                            ))
                            : <p>Não existem registos a apresentar</p>
                }
            </div>
        </div>
    )
}