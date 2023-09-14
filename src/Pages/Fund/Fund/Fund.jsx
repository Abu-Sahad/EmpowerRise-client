import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../Context/DataContext';
import axios from 'axios';
import FundPost from './FundPost';
import DonationPagenation from '../../Donation/Donation/DonationPagenation';
import DonationTopMenu from '../../Donation/Donation/DonationTopMenu';
import SectionTitle from '../../../component/SectionTittle/SectionTittle';
import img from '../../../assets/blogs/blogImage.jpg'

const Fund = () => {
    const {state,dispatch} = useContext(DataContext);
    //state
    const [data,setData] = useState([]);
    const [totalData,setTotalData] = useState(null);
   
    useEffect(()=>{
       // console.log("state => ",state);
        if(state.type){
        axios.post('http://localhost:5000/mainData',state)
        .then(res=>{
            setData(res.data.allData);
            setTotalData(res.data.totalData);
        })
        .catch(err=>console.log(err));
        }
    },[state]);
    useEffect(()=>{
        dispatch({type:'SET_TYPE',payload:'fund'});
    },[])

    return (
        <>
        <SectionTitle img={img} tittle='Fund Post'/>
         <div className='max-w-screen-lg mx-auto divide-y mt-8'>
            <DonationTopMenu type='fund'/>
            <div className="mt-7 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7">
              {data.map(single=><FundPost key={single._id} post={single}  />)}
            </div>
            <DonationPagenation totalData = {totalData}/>

        </div>
        </>
       
    );
};

export default Fund;