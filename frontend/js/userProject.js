import { getCurrentUser, useFetchGet, useFetchPost } from "./auth/utilities.js"
import { formatDate } from "./global.js";


const mainBody = document.getElementById("projects-section")
renderProject()

async function renderProject() {
    try {

        const user = getCurrentUser()
        let projHisSectionHtml = ''
        const [res, code] = await useFetchGet(`http://localhost:3000/projects/user/hist`)
        if (code == 200) {
            res.data.forEach((proj) => {
                console.log(proj);
                projHisSectionHtml += `
                        <div class="project-card">
                            <h3 class="project-title">${proj.project}</h3>
                            <p class="project-desc">${proj.description}</p>
                            <div class="project-completion">Completed - <span id="completion-date">${proj.completed_on? formatDate(proj.completed_on):"In progress"}</span> </div>
                            <div class="status-icon"></div>
                        </div>
                        `
            })
            mainBody.innerHTML = projHisSectionHtml
        }
        else if (code == 404) {
            document.querySelector(".project-title").innerHTML = "No Assigned Project At the Moment";
        }

    } catch (error) {
        console.log(error);
    }

}