import { useFetchGet, useFetchPost } from "./auth/utilities.js"


const usersSection = document.getElementById("users")
const usersFielter = document.getElementById("users-list-sort")
renderUsers()
usersFielter.addEventListener("change", e => {
    renderUsers(usersFielter.value)
})
function renderUsers(fielter = 'all') {
    useFetchGet("http://localhost:3000/users").then(r => {
        let users = r.users
        if (fielter == "unverified") {
            users = users.filter(user => !user.is_verified)
        }
        else if (fielter == "verified") {
            users = users.filter(user => user.is_verified )
        }
    
        console.log(users);
        let usersList = ""
        for (let user of users) {
            // console.log(user);
            usersList +=
                `<div class="user-card" id=${user.id}>
                    <div class="user-select">
                        <input type="checkbox" >
                    </div>
                    <div class="user-name-section">
                        <h4 class="user-name">${user.full_name}</h4>
                    </div>
                    <div class="user-email-section">
                        <p class="user-email">${user.email}</p>
                    </div>
                    <div class="user-project-section">
                        <p class="user-project">${user.project}</p>
                    </div>
                    <div class="user-verified">
                        <p class="user-project">${user.is_verified ? '<iconify-icon class="icon-correct" icon="icon-park-twotone:correct"></iconify-icon>' : '<iconify-icon class="icon-waiting" icon="streamline:interface-page-controller-loading-half-progress-loading-load-half-wait-waiting"></iconify-icon>'}</p>
                    </div>
                </div>`
        }
        usersSection.innerHTML = usersList
    })

}

