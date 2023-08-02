const logout = document.getElementById("logout")
logout.addEventListener("click",()=>{
    sessionStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    setInterval(window.location.replace("/auth/login.html"),4000)
    
})