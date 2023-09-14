import axios from 'axios';
import {useEffect, useState} from 'react';
import AdminComponent from '../AdminComponent/AdminComponent';

const FundRequest = () => {
    const [list,setList] = useState([]);
    //effect
    useEffect(()=>{
        axios.post('http://localhost:5000/adminPostRequest',{type:'fund'})
        .then(res=>{setList(res.data)})
        .catch(err=>console.log(err));
    },[])

    return(
    <>
     <h2 className='text-3xl flex justify-center'>Donation request </h2> 
     <AdminComponent list={list} setList={setList} type='fund'/>
    </>
    )
};

export default FundRequest;