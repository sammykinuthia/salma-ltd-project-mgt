import { useFetchGet,url } from "../auth/utilities.js"


const fetchPosts = async ()=>{
    const token = localStorage.getItem('token')
    
    const resp = await fetch(`${url}projects/`,{
        headers:{
            'Content-Type': 'application/json',
            
        }

    });

    console.log(resp)


    
   



}

fetchPosts()


if(status == 200){
    

}
else if(status==404){

}
else{
   
}