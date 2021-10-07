import { combineReducers } from "redux";
import PopUpReducer from "./PopUpReducer";
import CartReducer from "./CartReducer";
import OrderReducer from "./OrderReducer";
import OrderHistoryReducer from "./OrderHistoryReducer";

const allReducers = combineReducers({
    popUpReducer: PopUpReducer,
    CartReducer: CartReducer,
    orderReducer: OrderReducer,
    orderHistory: OrderHistoryReducer
})

export default allReducers;