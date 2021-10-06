import { combineReducers } from "redux";
import PopUpReducer from "./PopUpReducer";
import CartReducer from "./CartReducer";
import OrderReducer from "./OrderReducer";

const allReducers = combineReducers({
    popUpReducer: PopUpReducer,
    CartReducer: CartReducer,
    orderReducer: OrderReducer
})

export default allReducers;