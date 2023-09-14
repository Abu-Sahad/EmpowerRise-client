import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserInfo from '../../../../CustomHooks/useUserInfo/useUserInfo';
import AdminComponent from '../../AdminDashboard/AdminComponent/AdminComponent';

const UserDonationTable = () => { 

  const [list,setList] = useState([]);
  const {userId} = useUserInfo();

  //effect
  useEffect(()=>{
    axios.post('http://localhost:5000/getDonationList',{userId})
    .then(res=>setList(res.data))
    .catch(err=>console.log(err))
  },[userId])

    return (
    <div>
        <h2 className='text-3xl flex justify-center'> Donation Post </h2> 
        <AdminComponent list={list} setList={setList} type='donationTable'/>
    </div>
    );
};

export default UserDonationTable;