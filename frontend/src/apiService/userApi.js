import baseUrl from "../config/config.js"

const create = (user) =>{
    return fetch(`${baseUrl}/api/users`,{
        method: "POST",
        headers:{ "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(response => response.json()).catch(err => console.log(err))
}

const signin = (user) =>{
    return fetch(`${baseUrl}/auth/signin`,{
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const signout = () =>{
    return fetch(`${baseUrl}/auth/signout`,{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).catch((err) => console.log(err))
}
export {create,signin,signout}