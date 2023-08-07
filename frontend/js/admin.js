import { getCurrentUser, useFetchGet,url,useFetchPost} from "./auth/utilities.js";
import { formatDate } from "./global.js";

console.log(window.location.href)
const currentURL = window.location.href;
const path = new URL(currentURL).pathname;




const currentUser = getCurrentUser()
if(!currentUser){
    window.location.replace("/auth/login")
    
}

// console.log(currentUser);
// document.getElementById("username").textContent = currentUser.username


if(path == "/admin/"){
const fetchProjects = async ()=>{
   
    const [resp,status]= await(useFetchGet(`${url}projects`));
    console.log(resp)
    const projects = resp['data'];

    const mainBody = document.querySelector(".projects-body");
    let html = ``;
    
 
    if(status == 200){
        projects.forEach((project)=>{
            html+=`
            <div class="project-card" id="${project.id}">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-desc">${project.description.slice(0,13)}</p>
                <div class="project-completion">To be Completed by <span id="completion-date">${formatDate(project.end_date)}</span> </div>
                <div class="status-icon"></div>
            </div>
            `

        });
       
      

        
    }
    else if(status == 404){
        html = "There Are No Projects Use the Add Project Button To add Some"
    }
    else{
        html = "There Was An Error Getting Projects"
    }
    mainBody.innerHTML = html;

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(
    (projectCard, index)=>{
        projectCard.addEventListener("click",()=>{
            localStorage.setItem("projId",projectCard.id)
            window.location.href = `./project.html`;

        })
    }
    )

}


fetchProjects();    
}






if(path == "/admin/project.html"){
    
    const projectDetails = async()=>{
        const id = localStorage.getItem("projId");
        const [resp,status]= await(useFetchGet(`${url}projects/${id}`));
        const project = resp['project'][0];
        if(status == 200){
            document.querySelector(".project-desc").innerHTML = project.description;
            document.querySelector("#completion-date").innerHTML = formatDate(project.end_date);
            document.querySelector(".title-main").innerHTML = project.name;
            localStorage.setItem("projectName",project.name);

        }
        else{
            document.querySelector(".project-desc").innerHTML = "Error";
            document.querySelector("#completion-date").innerHTML = "Error";
           


        }
        

        const [response, status_] = await(useFetchGet(`${url}projects/${id}/users`));
        const users = response['users']
        const list = document.querySelector(".list-users");

       

        if(status_ == 200){
            users.forEach((user)=>{
                const listItem = document.createElement("li");
                listItem.textContent = `${user.full_name} ${user.email}`;

                list.appendChild(listItem);
    
            });

            
        }
        else if(status_ == 404){
           
            list.innerHTML = "No Users Assigned";
          
        }
        else{
            list.innerHTML = "Error Fetching Users";
           
        } 
    
}


projectDetails();
}
     
if(path == "/admin/assign.html"){

    const id = localStorage.getItem("projId");
   
    const fetchUsers = async()=>{
        const [resp,status]= await(useFetchGet(`${url}users/`));
        const users = resp.users;
        const users_ = users.filter(user => user.projects == null && user.is_verified && !user.is_admin);
        
        let html = "";
        const container = document.getElementById("users")
        if(status == 200){
            document.querySelector(".title-main").innerHTML = localStorage.getItem("projectName")?? "Projrct"
            users_.forEach((user) => {
                
              html += `
              <div class="user-select">
                <input type="checkbox" id="${user.id}">
              </div>
              <div class="user-name-section">
                <h4 class="user-name">${user.full_name}</h4>
              </div>
              <div class="user-email-section">
                <p class="user-email">${user.email}</p>
              </div>
            
            `;
            });
    
            container.innerHTML = html;
             
        }
        else if(status == 404 || users_.length == 0){
            container.innerHTML = "No unassigned users";
        }
        else{
            container.innerHTML = "Error";
        }
    
    }

    const button = document.querySelector("#assign")
    button.addEventListener("click",async()=>{
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checkedIds = []
    
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
              const id = checkbox.id;
              checkedIds.push(id);
            }
          });

        console.log(checkedIds)


        const [resp,status]= await(useFetchPost(`${url}projects/assign/`,{'user_ids': checkedIds, 'project_id':id}));

        

        fetchUsers();
    })
   
    
    







fetchUsers();
}









