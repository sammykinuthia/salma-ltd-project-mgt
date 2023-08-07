import { getCurrentUser } from "./auth/utilities.js";

const currentUser = getCurrentUser()
if(!currentUser){
    window.location.replace("/auth/login")
    
}

console.log(currentUser);
document.getElementById("username").textContent = currentUser.username