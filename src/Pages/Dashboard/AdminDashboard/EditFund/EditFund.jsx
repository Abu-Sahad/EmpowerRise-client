import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashboardTable from '../../../../components/DashboardTable/DashboardTable';

const EditFund = () => { 
    const [fundList,setFundList] = useState([]);
    

    //effect 
    useEffect(()=>{
        axios.post('http://localhost:5000/getEditPostList',{type:'fund'})
        .then(res=>setFundList(res.data))
        .catch(err=>console.log(err))
    },[])

    return (
        <>
          <DashboardTable dataList={fundList} setDataList={setFundList} type='fund' /> 
        </>
    );
};

export default EditFund;