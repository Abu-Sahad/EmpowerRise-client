import {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import DropDown from '../../../components/DropDown/DropDown';
import {DataContext} from '../../../Context/DataContext';
import { Link } from 'react-router-dom';

const DonationTopMenu = ({type}) => {
    const {dispatch} = useContext(DataContext);
    const [categoryList,setCategoryList] = useState([]);
        useEffect(()=>{
      axios.get('http://localhost:5000/getAllCategory')
      .then(res=>{
        setCategoryList(res.data);
      })
      .catch(err=>console.log(err));
    },[])

    const setStatus = (e)=>{
        dispatch({type:'SET_STATUS',payload:e.target.value})
    }
    const setCategory = (e)=>{
        dispatch({type:'SET_CATEGORY',payload:e.target.value});
    }
    const setSort = (e)=>{
        dispatch({type:'SORT_BY',payload:e.target.value})
    }
    
    const selectStatus = [
        {field:"unsuccessful",_id:1},
        {field:"successful",_id:2},
        {field:"processing",_id:3}
    ];

    const sortBy = [
        {_id:4,field:'newest'},
        {_id:5,field:'oldest'},
        {_id:6,field:'highToLow'},
        {_id:7,field:'lowToHigh'}

    ]

    const selectCategory =  categoryList.map(obj=>({
        field : obj.category,
        _id:obj._id,
    }));

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 justify-items-stretch ">
                <div className="flex flex-row mx-1">
                    <p className='font-poppins mt-5 me-4 font-light'>By Status</p>
                    <DropDown List={selectStatus} handler={setStatus}/>
                </div>
                <div className="flex flex-row mx-1">
                    <p className='font-poppins mt-5 me-4 font-light'> Sort By</p>
                    <DropDown List={sortBy} handler={setSort}/>
                </div>
                <div className="flex flex-row mx-1 sm:me-8 md:md-0">
                    <p className='font-poppins mt-5 me-4 font-light '>Category</p>
                    <DropDown List={selectCategory} handler={setCategory}/>
                </div>
                <div className="flex flex-row mx-1 ms-5 md:ms-0">
                   {type==='fund' ?  <Link to='../addFund' className='font-poppins mt-3 me-5 font-light px-5 py-2 bg-violet-600 rounded-md text-white'>Add Fund Post</Link>
                   : <Link to='../addDonation' className='font-poppins mt-3 me-5 font-light px-5 py-2 bg-violet-600 rounded-md text-white'>Add Donation Post</Link>
                } </div>

                
            </div>
    );
};

export default DonationTopMenu;