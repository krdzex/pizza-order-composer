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
    }
})


export default mongoose.model("Order", OrderSchema);