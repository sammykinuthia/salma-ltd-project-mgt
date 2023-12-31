const logout = document.getElementById("logout")

logout.addEventListener("click",()=>{
    try {
        sessionStorage.removeItem("currentUser")
        localStorage.removeItem("token")
    } catch (error) {
        console.log(error);
    }

    setInterval(window.location.replace("/auth/login.html"),4000)
    
})


export function formatDate(dateString) {
    const months = ["Jan","Feb","March","April","May",
                     "June","July","Aug","Sep","Oct","Nov","Dec"   ]
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${months[month-1]}-${year}`;
  }
  
  
 