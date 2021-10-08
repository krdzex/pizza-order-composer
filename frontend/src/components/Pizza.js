import React, { useEffect, useState } from 'react';
import { list } from '../apiService/doughApi';
import Dough from './Dough';

const Pizza = () => {

    useEffect(() => {
        list().then(response => setDoughsArray(response)).catch(err => console.log(err))
    }, [])
    const [doughsArray, setDoughsArray] = useState([])
    return (
        <div className="pizzaWrapper">
            <div className="title">
                <h2>Pick a Dough</h2>
            </div>
            {doughsArray.map((dough, id) => {
                return <Dough doughInfo={dough} key={id} />
            })}
        </div>
    );
};

export default Pizza;