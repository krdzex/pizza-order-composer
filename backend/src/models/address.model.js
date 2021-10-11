import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    creator: {
        type: String
    },
    address: {
        type: String,trim:true,
        required: "Address is required"
    },
    floor: {
        type: Number
    }
})

export default mongoose.model("Address", AddressSchema);