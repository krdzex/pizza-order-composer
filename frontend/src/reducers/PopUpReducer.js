const PopUpReducer = (state = { ingredients: false, signin: false, signup: false }, action) => {
    switch (action.type) {
        case "OPEN_INGREDIENTS":
            return { ...state, ingredients: true };
        case "CLOSE_INGREDIENTS":
            return { ...state, ingredients: false }
        case "OPEN_SIGNIN":
            return { ...state, signin: true };
        case "CLOSE_SIGNIN":
            return { ...state, signin: false }
        case "OPEN_SIGNUP":
            return { ...state, signup: true };
        case "CLOSE_SIGNUP":
            return { ...state, signup: false }
        default:
            return state
    }
}

export default PopUpReducer;