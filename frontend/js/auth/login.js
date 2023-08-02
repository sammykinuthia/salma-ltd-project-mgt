import { useFetchPost } from "./utilities.js"

const loginForm = document.querySelector("#form-login")

loginForm.addEventListener("submit",async e=>{
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("passwd").value
    const data = {username,password}
    const [resp,status] = await useFetchPost("http://localhost:3000/users/login",data)
    if(status == 200){
        localStorage.setItem("token", resp.data.token)
        console.log((resp));
        setInterval( window.location.replace("/"),4000)
       
    }
    else{
        console.log(resp);
    }

})
