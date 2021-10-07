const CartReducer = (state = { dough: [], ingredients: [], howMany: [] }, action) => {
    switch (action.type) {
        case "NEW_ORDER":
            return { ...state, dough: [...state.dough, action.payload], howMany: [...state.howMany, 1] };
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
        case "DELETE_ORDERS":
            return state = { dough: [], ingredients: [], howMany: []}
        default:
            return state
    }
}

export default CartReducer;