const OrderHistoryReducer = (state = {open: false},action) => {
    switch (action.type) {
        case "OPEN_HISTORY":
            return { ...state, open: true };
        case "CLOSE_HISTORY":
            return { ...state, open: false };
        default:
            return state
    }
}

export default OrderHistoryReducer;