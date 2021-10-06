import React from 'react';
import Dough from './Dough';

const Pizza = () => {
    const doughsArray = [
        { name: "New York style Dough", description: "Thin crust - all-purpose or bread flour,sugar,salt,instant yeast,olivie oil, and water.", price: 10 },
        { name: "Neapolitan Style Dough", description: "Grilled dough - bread flour,salt,instant yeast, and water", price: 9 },
        { name: "Sicilian Style Dough", description: "Square pizza - all-purpose or bread flour, salt,instant yeast,olivie oil, and water.", price: 10 },
        { name: "Gluten Free Dough", description: "Gluten-free bread flour,sugar,fine salt, gf baking powder, xanthan gum and olivie oil", price: 15 }];
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