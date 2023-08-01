import { useFetchPost } from "./utilities.js"

const registerForm = document.querySelector("#form-register")


registerForm.addEventListener("submit", async e => {
    e.preventDefault()
    const fullName = document.getElementById("full-name").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("passwd").value
    const data = { full_name: fullName, username, email, password }
    const [resp,status]  = await useFetchPost('/users/register',data)
    if(status == 201){
        console.log(resp);
        setTimeout(window.location.replace('/auth/login.html'), 3000)
        
    }else{
        console.log("error registering", resp);
    }

})