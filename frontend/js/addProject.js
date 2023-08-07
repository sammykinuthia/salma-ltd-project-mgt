import { useFetchPost } from "./auth/utilities.js"

document.getElementById("addproject").addEventListener("submit", async(e) => {
    e.preventDefault()

    let projectTitle = document.getElementById("proj_title")
    let projectDesc = document.getElementById("proj_description")
    let projectStart = document.getElementById("start_date")
    let projectEnd = document.getElementById("end_date")
    let data = {
        name: projectTitle.value,
        description: projectDesc.value,
        start_date: projectStart.value,
        end_date: projectEnd.value
    }
    console.log(data);
   const [res, code] = await useFetchPost("http://localhost:3000/projects", data)
   if(code == 200){
    window.location.replace("./index.html")
   }
   else{
    document.getElementById('error').textContent = res.message
   }
//    console.log(res);
//    console.log(code);
})



document.addEventListener("DOMContentLoaded", function () {
    const startDateInput = document.getElementById("start_date");
    const endDateInput = document.getElementById("end_date");

  
    const today = new Date().toISOString().split("T")[0];
    
 
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    startDateInput.setAttribute("min", today);
    endDateInput.setAttribute("min", tomorrow);
 });

