const CartReducer = (state = { dough: [], ingredients: [], howMany: [],deletedOrderId: [] }, action) => {
    switch (action.type) {
        case "NEW_ORDER":
            return { ...state, dough: [...state.dough, action.payload], howMany: [...state.howMany, 1],deletedOrderId:[] };
        case "ADD_INGREDIENTS":
            return { ...state, ingredients: [...state.ingredients, action.payload] };

        case "ONE_MORE":
            return {
                ...state, howMany: state.howMany.map(
                    (singleOrder, i) => i === action.id ? singleOrder + 1 : singleOrder
                )
            }
        case "ONE_LESS":
            return {
                ...state, howMany: state.howMany.map(
                    (singleOrder, i) => i === action.id ? singleOrder - 1 : singleOrder
                )
            }

        case "DELETE_ORDER":
            return {
                ...state, dough: state.dough.filter(
                    (singleDough, i) => i !== action.id
                ),ingredients: state.ingredients.filter(
                    (ingredients, i) => i !== action.id
                ),
                howMany: state.howMany.filter(
                    (howManyOrders, i) => i !== action.id
                ),
                deletedOrderId: action.id
            }

        case "DELETE_ORDERS":
            return state = { dough: [], ingredients: [], howMany: [],deletedOrderId: [] }
        default:
            return state
    }
}

export default CartReducer;