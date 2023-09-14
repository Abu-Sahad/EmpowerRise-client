import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashboardTable from '../../../../components/DashboardTable/DashboardTable';

const EditDonation = () => { 
    const [donationList,setDonationList] = useState([]);
    

    //effect 
    useEffect(()=>{
        axios.post('http://localhost:5000/getEditPostList',{type:'donation'})
        .then(res=>setDonationList(res.data))
        .catch(err=>console.log(err))
    },[])

    return (
        <>
          <DashboardTable dataList={donationList} setDataList={setDonationList} type='donation' /> 
        </>
    );
};

export default EditDonation;