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

export const ordered = () => {
    return {
        type: "ORDERED",
    }
}


export const deleteOrders = () => {
    return {
        type: "DELETE_ORDERS",
    }
}

export const deleteOrder = (id) => {
    return {
        type: "DELETE_ORDER",
        id: id
    }
}

export const openHistory = () => {
    return {
        type: "OPEN_HISTORY",
    }
}

export const closeHistory = () => {
    return {
        type: "CLOSE_HISTORY",
    }
}

export const removePrice = () => {
    return {
        type: "REMOVE_PRICE",
    }
}