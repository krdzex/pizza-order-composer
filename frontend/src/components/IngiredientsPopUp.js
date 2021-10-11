import React, { useEffect, useState } from 'react';
import glutenFree from "../images/gluten.png"
import { useDispatch } from 'react-redux';
import { addIngredients, closePopUpIngredients } from '../actions';
import { list } from '../apiService/ingredientApi';

const IngiredientsPopUp = () => {

    useEffect(()=>{
        list().then(response => setAllIngredients(response)).catch(err => console.log(err))

    },[])
    const dispatch = useDispatch()
    const [allIngredients, setAllIngredients] = useState([])

    const onClickClose = () => {
        const addingIngredientsArr = [];
        for (let i = 0; i < allIngredients.length; i++) {
            if (allIngredients[i].isChacked) {
                addingIngredientsArr.push({ name: allIngredients[i].name, price: allIngredients[i].price })
            }
        }
        dispatch(closePopUpIngredients());
        dispatch(addIngredients(addingIngredientsArr))
    }

    const onRadioChange = (id) => {
        const allIngredientsCopy = allIngredients.slice();

        if (allIngredients[id].isChacked === true) {
            allIngredientsCopy[id].isChacked = false;
        } else {
            allIngredientsCopy[id].isChacked = true;
        }
        setAllIngredients(allIngredientsCopy)
    }

    const onRadioChange2 = () => {
    }
    return (
        
            <div className="innerDiv" id="ingredients">
                <div className="ingredientsHeader">
                    <h2>Ingredients</h2>
                </div>
                <div className="ingredients">
                    {allIngredients.map((ingredient, id) => {
                        return <div className="ingredient" key={id}><div className="ingridientsLeftSide">{ingredient.glutenFree ? <img src={glutenFree} alt="glutenFreeIcon"></img> : <div style={{ width: "15px", color: "white" }}></div>}<input type="radio" id={id} checked={allIngredients[id].isChacked} onClick={() => onRadioChange(id)} onChange={onRadioChange2} />{ingredient.name}</div> <div>{ingredient.price}$</div></div>
                    })}
                </div>
                <button onClick={() => onClickClose()}>+ ADD TO CART</button>
            </div>
        
    );
};

export default IngiredientsPopUp;