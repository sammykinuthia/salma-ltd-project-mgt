import { useFetchPost } from "./utilities.js"

const url = "http://localhost:3000/"


const renderForm = ()=>{
    const email = localStorage.getItem("maillllin");
    const newInput = document.createElement("input");
    newInput.type = "email";
    newInput.id = "confirm-email-input";
    newInput.value = email;
    newInput.readOnly = true;

    const form = document.getElementById("confirm-email");

    form.insertBefore(newInput, form.firstChild);

}

document.getElementById("confirm-email").addEventListener("submit", async(e)=>{
    let email = document.getElementById("confirm-email-input").value
    console.log(email)
    e.preventDefault()
    const code = document.getElementById("confirm-email-code").value;
    const [resp,status]  = await useFetchPost(`${url}users/verify`,{email, code})


    if(status == 200){
        setTimeout(window.location.replace('./login.html'), 3000);
        // localStorage.removeItem("maillllin");

    }
    else{
        document.querySelector(".error").innerHTML = resp.message;

    }
    
   
})

renderForm();









// o2mtatajr2kk88@gmail.com