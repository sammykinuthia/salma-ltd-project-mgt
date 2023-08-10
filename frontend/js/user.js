import { getCurrentUser, useFetchGet, useFetchPost } from "./auth/utilities.js"
import { formatDate } from "./global.js";

const mainBody = document.getElementById("main-body")
renderProject()





async function renderProject() {
    try {
        let projeHtml = ""
        const user = getCurrentUser()
        const [res, code] = await useFetchGet(`http://localhost:3000/projects/u/${user.id}`)
        if (code == 404) {
            console.log(res);
            projeHtml += `
                            <h3>No Project</h3>
                        `
        }
        else if (code == 200) {
            if (res.data.length == 0) {
                projeHtml += `
                    <h3>No Project</h3>
                `
            }
            else {
                res.data.forEach(proj => {
                    console.log(proj);
                    projeHtml += `
                        <div class="project-card" id="${proj.id}">
                            <h3 class="project-title">${proj.title}</h3>
                            <p class="project-desc">${proj.description}</p>
                            <div class='proj-footer'>
                                <p class="project-completion">To be Completed by: <span id="completion-date">${formatDate(proj.end_date)}</span> </p> 
                            <button id='btn-completed'>Mark Completed?</button>
                            </div>
                            <div class="status-icon"></div>
                        </div>
                        `
                })
            }


            // document.getElementById("btn-completed").addEventListener("click", async () => {
            //     console.log("clicked");
            //     const id = document.getElementsByClassName("project-card")[0].id
            //     const [resp, code] = await markProjectCompleted(id)
            //     if (code == 202) {
            //         window.location.reload()
            //         console.log("yes");
            //     }
            //     else {
            //         console.log(resp);
            //     }
            // })



        }


        mainBody.innerHTML = projeHtml
        document.getElementById("btn-completed").addEventListener("click", async () => {
                console.log("clicked");
                const id = document.getElementsByClassName("project-card")[0].id
                const [resp, code] = await markProjectCompleted(id)
                if (code == 202) {
                    window.location.reload()
                    console.log("yes");
                }
                else {
                    console.log(resp);
                }
            })

    } catch (error) {
        console.log(error);
    }

}

async function markProjectCompleted(id) {
    console.log("clicked");
    return await useFetchPost(`http://localhost:3000/projects/completed/${id}`)

}