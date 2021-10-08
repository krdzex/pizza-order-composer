import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    glutenFree:{
        type: Boolean
    },
    isChacked:{
        type: Boolean
    },
    name: {
        type: String
    },
    price:{
        type: Number
    }
},
{collection: "ingredients"})


export default mongoose.model("Ingredient", IngredientSchema);