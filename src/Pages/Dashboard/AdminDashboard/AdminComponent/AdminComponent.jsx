import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminComponent = ({list,setList,type}) => {
     //function
    const updateRequest = (id,status)=>{
      axios.post('http://localhost:5000/adminStatusUpdate',{id,status,type})
      .then(res=>{
        if(res.data.status){
            Swal.fire({
                icon:'success',
                title:'Post Approved',
                text:'Post added to Donation Page',
                timer:1000
            })
        } else {
            Swal.fire({
                icon:'error',
                title:'Post Rejected',
                text:'Post deleted from database',
                timer:1000
            })
        }
        RemoveItem(id)
      })
    }

    const RemoveItem = (id) => {
     const newArray =  list.filter(item => item._id !== id);
     setList(newArray);
   }



    return (
    <div className='font-poppins '>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Status</th>
        <th>Amount</th>
        <th>Day Left</th>
        {type==='donation' && <th>Location </th> }
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
      list.map(item=>    
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
        <td>{item.status}</td>
        <td>{item.amount}</td>
        <td>{item.dayLeft}</td>
        <td>{item.location}</td>
        {type==='donationTable' ? <td>
            <Link to={`/SingleDonation/${item._id}`} className="btn btn-success btn-xs mr-2 text-white" >view</Link>
        </td> : type==='fundTable' ? <td>  <Link to={`/dashboard/fundAllApply/${item._id}`} className="btn btn-info btn-xs  text-white" >See Apply </Link></td> : 
        <td>
          <button className="btn btn-success btn-xs mr-2 text-white" onClick={()=>{updateRequest(item._id,'accept')}}>Accept</button>
          <button className="btn btn-error btn-xs text-white" onClick={()=>{updateRequest(item._id,'reject')}}>Reject</button>
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

export default AdminComponent;