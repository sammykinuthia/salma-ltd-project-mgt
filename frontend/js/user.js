import { getCurrentUser, useFetchGet, useFetchPost } from "./auth/utilities.js"


const mainBody = document.getElementById("main-body")
renderProject()

async function renderProject(){
    try {
        
        const user = getCurrentUser()
        console.log(user);
        const [res, code] = await useFetchGet(`http://localhost:3000/projects/${user.id}`)
        if(code == 200){

       
        console.log(res);
        document.querySelector(".project-title").innerHTML = res.data.name
        }
        else if(code == 404){
            document.querySelector(".project-title").innerHTML = "No Assigned Project At the Moment";
        }

    } catch (error) {
        console.log(error);
    }

}