import baseUrl from "../config/config.js"

const createAddress = (address) => {
    return fetch(`${baseUrl}/api/address`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(address),
    }).then(response => response.json()).catch(err => console.log(err))
}

const addressList = (user) => {
    return fetch(`${baseUrl}/api/address/${user}`, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
    }).then(response => response.json()).catch(err => console.log(err))
}

export { createAddress,addressList }