import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getStorage, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {app} from '../../../firebase/firebase.config';
import img from '../../../assets/donation/defaultDonation.png';

 
const FundApply = ({details,user,setReload}) => {
  const uniqueId = uuidv4();
  const Storage = getStorage(app);

  //state
  const [info,setInfo] = useState({});
  const [selectedImages, setSelectedImages] = useState(null);

  let image = 'https://firebasestorage.googleapis.com/v0/b/empowerrise-21578.appspot.com/o/empowerRise%2Fimage%2Feb60ac7d-ba14-4953-bbd7-78aa19d29bd2_defaultDonation.png?alt=media&token=00b1d376-3174-4396-a87a-c10f4a204141';
    if(user){
       if(user.photoURL) image = user.photoURL; 
    }
  

  //function 
  const uploadImages = async () => {
      if(selectedImages){
            const imageName = `${uniqueId}_${selectedImages.name}`;
            const imageRef = ref(Storage, `empowerRise/image/${imageName}`);
        try {
            const snapshot = await uploadBytes(imageRef, selectedImages);
            const imageUrl = await getDownloadURL(snapshot.ref);
            return imageUrl;
        } catch (err) {
            console.error("Error uploading image:", err);
        }
      }      
    };
    const handleInfo = (e)=>{
       setInfo(value=>({...value,[e.target.name]:e.target.value}))
    }

  const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer:5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

  const onSubmit = async() => {
    Toast.fire({
      icon: 'info',
      title: 'Waiting for image being uploaded !! '
    })
    const documentUrl = await uploadImages();
    const data = {
      userId:details.userId,
      userImage:image,
      postId:details._id,
      userName:info.name,
      userEmail:info.email,
      document:documentUrl,
      status:'pending'
    }
    console.log("imageURL ", documentUrl);
    
   axios.post('http://localhost:5000/applyFund',data)
   .then(res=>{
    if(res.data.status){
      Swal.fire({
        icon: 'success',
        title: 'Document Upload successfully',
        text: 'Wait until the day is over and posted people will response',
      })
    }
   })
   .catch(err=>console.log(err));
  }

    return (
    <div>
        {/* You can open the modal using ID.showModal() method */}
        <button className="btn px-5 py-3 bg-violet-600 text-white rounded-md mt-5 hover:bg-violet-800" onClick={()=>window.my_modal_3.showModal()}>Apply</button>
        <dialog id="my_modal_3" className="modal ">
        <form method="dialog" className="modal-box">
            <h2 className='text-2xl mx-auto ms-5 mb-5'>Apply Here</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <div className='flex flex-col md:ms-4'>
                <div className='flex flex-col'>
                <label className='text-md text-poppins text-md ms-1'>Name</label>
                <input className='border rounded-sm border-violet-600 ps-4 mt-3 h-10 me-5' onBlur={handleInfo} name='name' type='text' />
              </div>
              <div className='flex flex-col mt-3'>
                <label className='text-md text-poppins text-md ms-1 mb-0'>Email</label>
                <input className='border rounded-sm border-violet-600 ps-4 mt-3 h-10 me-5' onBlur={handleInfo} name='email' type='email' />
              </div>
              <div className='flex flex-col mt-3'>
                <label className='text-md text-poppins text-md ms-1 mb-0'>Document</label>
                <input className='border rounded-sm border-violet-600 ps-4 mt-3 h-10 me-5 pt-1'  name='file' type='file' onChange={(e)=>{setSelectedImages(e.target.files[0])}} />
              </div>

            </div>
             <input className='border border-violet-600 ms-4 px-8 py-3 mt-5 cursor-pointer hover:bg-violet-600 hover:text-white hover:border-white hover:border-2 rounded-md' type="submit" onClick={onSubmit} />
        </form>
        </dialog>
    </div>
    );
};

export default FundApply;