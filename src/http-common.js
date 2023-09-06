import axios from "axios"; 

export default axios.create({
    
    baseURL:"https://api.public-privacy.xyz",
    //baseURL:"http://localhost:8080",

    headers:{
      "Content-type":"application/json",
    },
    withCredentials:true
    
})


