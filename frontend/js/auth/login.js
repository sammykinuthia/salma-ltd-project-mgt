import { useFetchPost } from "./utilities.js"

const loginForm = document.querySelector("#form-login")

loginForm.addEventListener("submit",async e=>{
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("passwd").value
    const data = {username,password}
    const [resp,status] = await useFetchPost("http://localhost:3000/users/login",data)
     console.log(resp)
    if(status == 200){
        localStorage.setItem("token", resp.data.token)
        sessionStorage.setItem("currentUser", JSON.stringify(resp.data.user))

        // console.log(resp.user.is_admin);
        if(resp.data.user.is_admin){
            setInterval( window.location.replace("../admin/"),4000)
        }
        else{
            setInterval( window.location.replace("../user/"),4000)
        }

    }

    else{
        document.querySelector(".error").innerHTML = `<small> ${resp.message}</small>`;
    }

})
