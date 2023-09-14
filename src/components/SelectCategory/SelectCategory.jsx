import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

const SelectCategory = ({setSelectCategory}) => {
  const [categoryList,setCategoryList] = useState([]);

   useEffect(()=>{
    axios.get('http://localhost:5000/getAllCategory')
    .then(res=>{setCategoryList(res.data)})
    .catch(err=>{console.log(err)});
 },[])

  const addCategory = (e)=>{
    setSelectCategory(e.target.value);
  }
    return (
         <select className="border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-80 bg-white" onChange={addCategory}>
                <option disabled selected >Select</option>
                {
                 categoryList.map(category=><option key={category._id} value={category.category}>{category.category}</option>)
                }
         </select>
    );
};

export default SelectCategory;