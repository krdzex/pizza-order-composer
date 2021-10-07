import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    dough: {
        type: String, trim: true,
    },
    ingredients:[],
    price:{
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator:{
        type: String
    },
    quantity:{
        type: Number
    }
})


export default mongoose.model("Order", OrderSchema);