import { useFetchPost, checkUser } from "./utilities.js"

if (window.location.pathname == "/") {
    const token = localStorage.getItem("token")
    if (!token)
        window.location.replace("/auth/login.html")
    else {
        // const [resp, status] = useFetchPost("/users/check",{token})
        const [user, status] = await checkUser('/users/check', token)
        if (status == 401) {
            console.log(user);
            window.location.replace("/auth/login.html")

        }

        else {
            console.log("login success");
            sessionStorage.setItem("currentUser", JSON.stringify(user))
            if (user.is_admin)
                window.location.replace("/admin")

        }
    }

}