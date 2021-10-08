import baseUrl from "../config/config.js"

const list = () => {
    return fetch(`${baseUrl}/api/ingredient/`, { method: "GET" })
        .then(response => response.json())
        .catch((err) => console.log(err))
};

export { list }