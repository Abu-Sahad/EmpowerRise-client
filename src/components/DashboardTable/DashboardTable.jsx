import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const DashboardTable = ({dataList,setDataList,type}) => {

         //function
    const updateRequest = (id,status)=>{
      axios.post('http://localhost:5000/adminPostStatusUpdate',{id,status,type})
      .then(res=>{
        if(res.data.status){
          if(status==='successful'){
            Swal.fire({
                icon:'success',
                title:'status update successful',
                timer:1000
            })
        } else if(status==='unsuccessful') {
            Swal.fire({
                icon:'error',
                title:'status update unsuccessful',
                timer:1000
            })
         }  
        }
        
        RemoveItem(id)
      })
    }

    const RemoveItem = (id) => {
     const newArray =  dataList.filter(item => item._id !== id);
     setDataList(newArray);
   }

    return (
 <div className='font-poppins '>
 <div className="overflow-x-auto">
   <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        {type==='donation' && <th>Collected Amount</th>}
        {type==='fund' && <th>Total People</th>}
        <th>Day Left</th>
        {type==='donation' && <th>Location </th>}
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
      dataList.map((item)=>    
      <tr key={item._id}>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
            <div>
              <div className="font-bold hover:text-purple-700">
               {type==='donation' ? <Link to={`/SingleDonation/${item._id}`}>{item.title}</Link>: <Link to={`/SingleFund/${item._id}`}>{item.title}</Link> }  </div>
              <div className="text-sm opacity-50">{item.category}</div>
            </div>
          </div>
        </td>
        <td>{item.amount}</td>
        {type=='donation' && <td>{item.collectedAmount}</td>}
        {type=='fund' && <td>{item.totalPeople}</td>}
        <td>{item.dayLeft}</td>
        <td>{item.location}</td>
        {type==='donationTable' ? <td>
            <Link to={`/SingleDonation/${item._id}`} className="btn btn-success btn-xs mr-2 text-white" >view</Link>
        </td> : type==='fundTable' ? <td>  <Link to={`/dashboard/fundAllApply/${item._id}`} className="btn btn-info btn-xs  text-white" >See Apply </Link></td> : 
        <td>
          <button className="btn btn-success btn-xs mr-2 text-white mb-1" onClick={()=>{updateRequest(item._id,'successful')}}>Successful </button>
          <button className="btn btn-error btn-xs text-white" onClick={()=>{updateRequest(item._id,'unsuccessful')}}>Unsuccessful</button>
        </td>
       } 
      </tr>
      )
    }
     
    </tbody>  
  </table>
</div>
</div>
    );
};

export default DashboardTable;