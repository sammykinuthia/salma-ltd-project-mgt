import { useFetchGet, useFetchPost } from "./auth/utilities.js"


const usersSection = document.getElementById("users")
const usersFielter = document.getElementById("users-list-sort")
renderUsers()
usersFielter.addEventListener("change", e => {
    renderUsers(usersFielter.value)
})
async function renderUsers(fielter = 'all') {
    try {
        const [res, code] = await useFetchGet("http://localhost:3000/users")
        let users = res.users
        console.log(res.users);
        if (fielter == "unverified") {
            users = users.filter(user => !user.is_verified)
        }
        else if (fielter == "verified") {
            users = users.filter(user => user.is_verified)
        }

        let usersList = ""
        if (users.length > 0) {
            users.forEach((user, index) => {
                let i = index + 1
                usersList +=
                    `<tr>
                <td>${i}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.project || 'No Project'}</td>
                <td>${user.is_verified ? '<iconify-icon class="icon-early icon" icon="ic:sharp-done-outline"></iconify-icon>' : '<iconify-icon class="con-late" icon="circum:no-waiting-sign"></iconify-icon>'}</td>
            </tr>`
            })
        }
        else {
            usersList += `<tr>
                            <td>${1}</td>
                            <td>${None}</td>
                            <td>${None}</td>
                            <td>${None}</td>
                            <td>${None} </td>
                        </tr>
                        `
        }
        usersSection.innerHTML = usersList
    } catch (error) {
        console.log(error);
    }
}
