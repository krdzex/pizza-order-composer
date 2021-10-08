import mongoose from "mongoose";

const DoughSchema = new mongoose.Schema({
            name: {type: String},
            description: {type: String},
            price: {type: Number}
},
    { collection: 'dough' }
)


export default mongoose.model("Dough", DoughSchema);