import { getCurrentUser, useFetchGet, useFetchPost } from "./auth/utilities.js"


const mainBody = document.getElementById("main-body")
renderProject()

async function renderProject(){
    try {
        
        const user = getCurrentUser()
        console.log(user);
        const [res, code] = await useFetchGet(`http://localhost:3000/projects/${user.id}`)
        console.log(res);

    } catch (error) {
        console.log(error);
    }

}