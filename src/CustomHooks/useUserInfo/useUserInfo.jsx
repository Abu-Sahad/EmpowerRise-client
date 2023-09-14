import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
const useUserInfo = ()=>{
   const { user } = useContext(AuthContext);
   const [userInfo,setUserInfo] = useState({});
     useEffect(()=>{ 
       if(user){  
    axios.post('http://localhost:5000/findUserByEmail',{'email':user?.email})
    .then(res=>{
        setUserInfo(res.data[0]);
    })
    .catch(err=>console.log(err));
       }
   },[user?.email])
    const name = userInfo.name; 
    const photoURL = userInfo.photoURL; 
    const email = userInfo.email;
    const userId = userInfo._id;
    
  
  return {userId,email,name,photoURL};
}
export default useUserInfo;