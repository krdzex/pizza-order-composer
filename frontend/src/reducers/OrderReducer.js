const OrderReducer = (state = { isOrdered: false, ordersPrice: [] }, action) => {
    switch (action.type) {
        case "ORDER":
            return { ...state, isOrdered: true, ordersPrice: action.payload };
        default:
            return state
    }
}

export default OrderReducer;