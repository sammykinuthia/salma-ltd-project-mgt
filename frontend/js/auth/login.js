import { useFetchPost } from "./utilities.js"

const loginForm = document.querySelector("#form-login")

loginForm.addEventListener("submit",async e=>{
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("passwd").value
    const data = {username,password}
    const [resp,status] = await useFetchPost("/users/login",data)

    if(status == 200){
        localStorage.setItem("token", resp.token)
        window.location.replace("/")
        
    }
    else{
        console.log(resp);
    }

    // localStorage.setItem("token", resp.token)
    // console.log(resp.token);
})
