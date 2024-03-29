import baseUrl from "../config/config.js"

const createOrder = (order) => {
    return fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(order),
    }).then(response => response.json()).catch(err => console.log(err))
}

const orderHistoryList = (user) => {
    return fetch(`${baseUrl}/api/orders/${user}`, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
    }).then(response => response.json()).catch(err => console.log(err))
}

export { createOrder,orderHistoryList }