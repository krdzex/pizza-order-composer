function authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
        cb()
    }
}

function isAuthenticated() {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt"))
        return JSON.parse(sessionStorage.getItem("jwt"));
    else return false
}

function logout() {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt")
}

export default { authenticate, isAuthenticated, logout }