import React from 'react';
import { useDispatch } from 'react-redux';
import { addOrder, openPopUpIngredients } from '../actions';
const Dough = ({ doughInfo }) => {
    const dispatch = useDispatch()
    
    const onAddClick = () => {
        dispatch(openPopUpIngredients());
        dispatch(addOrder(doughInfo))
    }
    return (
        <div className="dough">
            <div className="doughHeader">
                <h2>{doughInfo.name}</h2>
                <div className="doughtRightSide">
                    <p>{doughInfo.price}$</p>
                    <button onClick={() => onAddClick()}>+ ADD</button>
                </div>
            </div>
            <div className="description">
                {doughInfo.description}
            </div>
        </div>
    );
};

export default Dough;