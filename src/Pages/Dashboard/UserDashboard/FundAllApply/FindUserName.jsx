import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FindUserName = ({id}) => {
    const [name,setName] = useState('');
    useEffect(()=>{
    axios.post('http://localhost:5000/findUserName',{id})
    .then(res=>{
        setName(res.data.name);
    }).catch(err=>console.log(err));
    },[id])
    return (
        <>
            {name}
        </>
    );
};

export default FindUserName;