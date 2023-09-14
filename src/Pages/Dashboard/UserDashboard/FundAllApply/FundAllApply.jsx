import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import FindUserName from "./FindUserName";
import Swal from 'sweetalert2';

const FundAllApply = () => {
    const {postId} = useParams();
    const [list,setList] = useState([]);

    useEffect(()=>{
        axios.post('http://localhost:5000/fundAllApply',{postId})
        .then(res=>{
            console.log("all apply ",res.data);
            setList(res.data)})
        .catch(err=>console.log(err))
    },[postId])

    const updateRequest = (id,status)=>{
      axios.post('http://localhost:5000/adminStatusUpdate',{id,status,type:'fundApply'})
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
        <div>
             <h2 className='text-3xl flex justify-center'>Fund All Apply </h2> 
             <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Status</th>
        <th>Amount</th>
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
                <img src={item.userImage} alt={item.title} />
              </div>
            </div>
            <div>
              <div className="font-bold hover:text-purple-700">
               {item.title}  </div>
              <div className="text-sm opacity-50">{item.category}</div>
            </div>
          </div>
        </td>
        <td><FindUserName id={item.userId} /></td>
        <td>{item.userEmail}</td>
        <td><Link target="_blank" to={item.document} className="btn btn-accent btn-xs mr-2 text-white">Document</Link></td>
        <td>
          <button className="btn btn-success btn-xs mr-2 text-white" onClick={()=>{updateRequest(item._id,'accept')}}>Accept</button>
          <button className="btn btn-error btn-xs text-white" onClick={()=>{updateRequest(item._id,'reject')}}>Reject</button>
        </td>
      </tr>
      )
    }
    </tbody>  
  </table>
</div>
        </div>
    );
};

export default FundAllApply;