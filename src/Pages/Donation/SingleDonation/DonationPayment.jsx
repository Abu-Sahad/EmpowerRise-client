import React, { useEffect, useState } from 'react';
import img from '../../../assets/donation/defaultDonation.png'
import axios from 'axios';
import Swal from 'sweetalert2';
const DonationPayment = ({details,user,setReload}) => {
    const [amount,setAmount] = useState(0);
    const [anonymous,setAnonymous] = useState(false);
    //console.log("details => ",details);

    let image = img;
    if(user){
       if(user.photoURL) image = user.photoURL; 
    }
    
    
  const onSubmit = () => {
    const data = {
        donatedAmount:parseInt(amount),
        isAnonymous:anonymous,
        userId:details.userId,
        userImage:image,
        userName:user.name,
        postId:details._id
    }
    axios.post('http://localhost:5000/donationPayment',data)
    .then(res=>{
        if(res.data.status){
            setReload(Math.random);
            Swal.fire({
            title: 'Thank For Your Donation',
            timer:2000,
            width: 600,
            padding: '3em',
            color: '#716add',
            })
        }
    })
    .catch(err=>console.log(err));
    console.log("donation data => ",data);
  }

    return (
    <div>
        {/* You can open the modal using ID.showModal() method */}
        <button className="btn px-5 py-3 bg-violet-600 text-white rounded-md mt-5 hover:bg-violet-800" onClick={()=>window.my_modal_3.showModal()}>Donation</button>
        <dialog id="my_modal_3" className="modal ">
        <form method="dialog" className="modal-box">
            <h2 className='text-2xl mx-auto ms-5'>Help Others</h2>
            <div className="form-control w-64 ms-4">
                <label className="cursor-pointer label">
                <span className="label-text">Anonymous Donation</span> 
                <input type="checkbox" className="toggle toggle-primary ms-5" 
                onClick={()=>{setAnonymous(!anonymous)}} />
                </label>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <div className='flex flex-col md:ms-4'>
                <div></div>
                <label className='text-md text-poppins text-md ms-1'>Amount</label>
              <input className='border rounded-sm border-violet-600 ps-4 mt-3 h-10 w-80'
                onBlur={(e)=>{setAmount(e.target.value)}} type='number' defaultValue={amount}
            />
            </div>
             <input className='border border-violet-600 ms-4 px-8 py-3 mt-5 cursor-pointer hover:bg-violet-600 hover:text-white hover:border-white hover:border-2 rounded-md' type="submit" onClick={onSubmit} />
        </form>
        </dialog>
    </div>
    );
};

export default DonationPayment;