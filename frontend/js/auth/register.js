import { useFetchPost } from "./utilities.js"

const registerForm = document.querySelector("#form-register")


registerForm.addEventListener("submit", async e => {
    e.preventDefault()
    const fullName = document.getElementById("full-name").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("passwd").value
    const data = { full_name: fullName, username, email, password }
    const [resp,status]  = await useFetchPost('http://localhost:3000/users/register',data)
    if(status == 201){
        console.log(resp);
        localStorage.setItem("maillllin", email)
        setTimeout(window.location.replace('confirmcode.html'), 3000)
        
    }else{
        document.querySelector(".error").innerHTML = `<small> ${resp.message}</small>`;
        console.log("error registering", resp);
    }

})