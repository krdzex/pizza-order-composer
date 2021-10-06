export const openPopUpIngredients = () => {
    return {
        type: "OPEN_INGREDIENTS"
    }
}

export const closePopUpIngredients = () => {
    return {
        type: "CLOSE_INGREDIENTS"
    }
}

export const openPopUpSignin = () => {
    return {
        type: "OPEN_SIGNIN"
    }
}

export const closePopUpSignin = () => {
    return {
        type: "CLOSE_SIGNIN"
    }
}

export const openPopUpSignup = () => {
    return {
        type: "OPEN_SIGNUP"
    }
}

export const closePopUpSignup = () => {
    return {
        type: "CLOSE_SIGNUP"
    }
}



export const addOrder = (newOrder) => {
    return {
        type: "NEW_ORDER",
        payload: newOrder

    }
}

export const addIngredients = (ingredients) => {
    return {
        type: "ADD_INGREDIENTS",
        payload: ingredients

    }
}


export const order = (ordersPrice) => {
    return {
        type: "ORDER",
        payload: ordersPrice
    }
}


export const oneMore = (id) => {
    return {
        type: "ONE_MORE",
        id: id
    }
}

export const oneLess = (id) => {
    return {
        type: "ONE_LESS",
        id: id
    }
}