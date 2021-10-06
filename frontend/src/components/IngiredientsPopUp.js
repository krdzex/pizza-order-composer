import React, { useState } from 'react';
import glutenFree from "../images/gluten.png"
import { useDispatch } from 'react-redux';
import { addIngredients, closePopUpIngredients } from '../actions';

const IngiredientsPopUp = () => {
    const dispatch = useDispatch()
    const [allIngredients,setAllIngredients] = useState([{
        glutenFree: true,
        isChacked: false,
        name: "Mozzarell cheese",
        price: 1
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Parmesan cheese",
        price: 1
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Cheddar cheese",
        price: 2
    },
    {
        glutenFree: false,
        isChacked: false,
        name: "Feta cheese",
        price: 1
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Parmesan cheese",
        price: 2
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Sliced black olives",
        price: 1.5
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Sliced green olives",
        price: 1
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Hot souce",
        price: 2
    },
    {
        glutenFree: false,
        isChacked: false,
        name: "Romaine lettuce",
        price: 0.5
    },
    {
        glutenFree: false,
        isChacked: false,
        name: "Chopped artichoke hearts",
        price: 1.5
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Chopped tomato",
        price: 1
    },
    {
        glutenFree: false,
        isChacked: false,
        name: "Sliced green onion",
        price: 1
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Mushrooms",
        price: 1
    },
    {
        glutenFree: true,
        isChacked: false,
        name: "Sprinke of dry oregano",
        price: 0.5
    },
    ])

    const onClickClose = () => {
        const addingIngredientsArr = [];
        for (let i = 0; i < allIngredients.length; i++) {
            if(allIngredients[i].isChacked){
                addingIngredientsArr.push({name:allIngredients[i].name,price:allIngredients[i].price})
            }
        }
        dispatch(closePopUpIngredients());
        dispatch(addIngredients(addingIngredientsArr))
    }

    const onRadioChange = (id) => {
        const allIngredientsCopy = allIngredients.slice();

        if( allIngredients[id].isChacked === true) {
            allIngredientsCopy[id].isChacked = false;
        }else {
            allIngredientsCopy[id].isChacked = true;
        }
        setAllIngredients(allIngredientsCopy)
    }
    
    const onRadioChange2 = () => {
    }
    return (
        <div className="popUpIngredients">
            <div className="innerDiv">
                <div className="ingredientsHeader">
                    <h2>Ingredients</h2>
                </div>
                <div className="ingredients">
                    {allIngredients.map((ingredient, id) => {
                        return <div className="ingredient" key={id}><div className="ingridientsLeftSide">{ingredient.glutenFree ? <img src={glutenFree} alt="glutenFreeIcon"></img> : <div style={{ width: "15px", color: "white" }}></div>}<input type="radio" id={id}  checked={allIngredients[id].isChacked} onClick={() => onRadioChange(id)} onChange={onRadioChange2} />{ingredient.name}</div> <div>{ingredient.price}$</div></div>
                    })}
            </div>
            <button onClick={() => onClickClose()}>+ ADD TO CART</button>
        </div>
        </div >
    );
};

export default IngiredientsPopUp;