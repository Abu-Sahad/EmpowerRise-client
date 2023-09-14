import React, { useContext } from 'react';
import { DataContext } from '../../../Context/DataContext';

const DonationPagenation = ({totalData}) => {
   // console.log("total data from pagination ", totalData);
    const dataInOnePage = 9;
    const totalPage = Math.ceil(totalData/dataInOnePage);
    const pageArray = Array(totalPage).fill(0);
    //console.log("total page from pagination ", pageArray);
    const {state,dispatch} = useContext(DataContext);

    const setPage = (page)=>{
        dispatch({type:"SET_PAGE",payload:page})
    }
    
    return (
        <div className='flex justify-center mb-32'>
            <div className="join mt-7">
            {
                pageArray.map((total,index)=> <button key={index} onClick={()=>{setPage(index+1)}}
                className={`join-item btn ${state.page===index+1 && 'btn-active'}`}>{index+1}
                </button>)
            }
            </div>
        </div>
    );
};

export default DonationPagenation;