import axios from 'axios';
import React, { useEffect, useState } from 'react';
import anonymousImage from '../../../assets/donation/anonymous.jpg'

const DonatedPeple = ({postId,reload}) => {
   const [donation,setDonation] = useState([]);
   
   useEffect(()=>{
    axios.post('http://localhost:5000/findDonatedPeople',{postId:postId})
    .then(res=>{ setDonation(res.data)})
    .catch(err=>console.log(err));
   },[postId,reload]);
   // console.log("donation ",donation)
 return (
  <div className="overflow-x-auto">
  {donation.length>0 &&<table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {
        donation.map(data=>
          <tr key={data._id}>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
               {data.isAnonymous ? <img src={anonymousImage} alt="data._id" /> :
               <img src={data.userImage} alt="data._id" /> 
                }
              </div>
            </div>
            <div>
              { data.isAnonymous ? <div className="font-bold">Anonymous </div> : <div className="font-bold">{data.userName}</div>}
              <div className="text-sm opacity-50">Member</div>
            </div>
          </div>
        </td>
        <td>{data.donatedAmount}</td>
      </tr>  
            )
      }  
      
    </tbody>

  </table>}
</div>
    );
};

export default DonatedPeple;