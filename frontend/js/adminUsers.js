import { useFetchGet, useFetchPost } from "./auth/utilities.js"


const users = document.getElementById("users")
let usersList = ""
useFetchGet("http://localhost:3000/users").then(r=>{
    // console.log(r.users)
    for(let user of r.users){
        
        usersList+= `<div class="user-card">
        <div class="user-select">
            <input type="checkbox" id="">
        </div>
        <div class="user-name-section">
            <h4 class="user-name">Sammy kigo</h4>
        </div>
        <div class="user-email-section">
            <p class="user-email">Sammykigo@gmail.com</p>
        </div>
        <div class="user-project-section">
            <p class="user-project">Dam construction</p>
        </div>
    </div>`
    }
    
})


users.innerHTML = usersList

