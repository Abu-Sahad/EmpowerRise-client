import { useState } from 'react';
//import QuillTextEditor from '../../../components/QuillTextEditor/QuillTextEditor';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SelectCategory from '../../../components/SelectCategory/SelectCategory';
import {getDownloadURL, ref, uploadBytes, getStorage} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {app} from '../../../firebase/firebase.config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useUserInfo from '../../../CustomHooks/useUserInfo/useUserInfo';
import Swal from 'sweetalert2';
import useDateNow from '../../../CustomHooks/useDateNow/useDateNow';

const AddDonation = () => {
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

 const [selectedImages, setSelectedImages] = useState(null);
 const [description,setDescription] = useState('');
 const [selectCategory,setSelectCategory] = useState('');
 const uniqueId = uuidv4();
 const Storage = getStorage(app);
 const {userId} = useUserInfo();
        
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
      //  const {dateNow} = useDateNow();

  const onSubmit = async(data) => {
     const imageUrl = await uploadImages();
     data = {...data,
          image:imageUrl,
          'description':description,
          donatedPeople:0,
          collectedAmount:0,
          userId,
          category:selectCategory,
          status:'pending',
          date: new Date()
        };
    console.log(data);
    axios.post('http://localhost:5000/addDonationPost',data)
    .then(res=>{
      if(res.data.status){
        Swal.fire({
          title:'Post add successfully',
          icon:'success',
          text:'Your post is Waiting for Admin approval',
          timer:2000
        })
      }
    })
    reset()
  }; 

  const addDescription = (value)=>{
    setDescription(value)
  }

    return (
        <div className='shadow-md md:mx-24 md:my-10 bg-base-200 px-12 md:py-14'>
        <div className="text-center">
            <h2 className='text-3xl font-poppins text-center'>Donation Post</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center mt-5 '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-poppins'>
                <div className='flex flex-col'>
                <label className='text-md text-poppins text-md ms-1'>Title</label>
              <input className='border border-gray-600 md:ps-4 mt-3 h-10 w-80 rounded-sm'
                {...register("title", {
                required: true,
                })}
                type='text'
            />
            {errors?.title?.type === "required" && <p className='text-red-600'>This field is required</p>}
            {errors?.title?.type === "maxLength" && (
                <p className='text-red-600'>First name cannot exceed 20 characters</p>
            )}
            {errors?.title?.type === "pattern" && (
                <p className='text-red-600'>Alphabetical characters only</p>
            )}
            </div>
            <div className='flex flex-col md:ms-4'>
                <label className='text-md text-poppins text-md ms-1'>Amount</label>
              <input className='border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-80 '
                {...register("amount", {
                required: true,
                valueAsNumber: true,
                })} type='number'
            />
            {errors?.title?.type === "required" && <p className='text-red-600'>This field is required</p>}
            </div>
            <div className='flex flex-col md:ms-4'>
                <label className='text-md text-poppins text-md ms-1'>Day Left</label>
              <input className='border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-80 '
                {...register("dayLeft", {
                required: true,
                //valueAsNumber: true,
                })} type='date'
            />
            {errors?.title?.type === "required" && <p className='text-red-600'>This field is required</p>}
            </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-poppins mt-5'>
              <div className='flex flex-col'>
                <label className='text-md text-poppins text-md ms-1'>Select Category </label>
                <SelectCategory setSelectCategory={setSelectCategory}/>
               </div>
            <div className='flex flex-col md:ms-4'>
                <label className='text-md text-poppins text-md ms-1'>Select Image</label>
                <input type="file" onChange={(e)=>{setSelectedImages(e.target.files[0])}} placeholder="Image" name='image' className='border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-80 ' />
               {/* handleImage={handleImage} setHandleImage={setHandleImage} /> */}
            {errors?.title?.type === "required" && <p className='text-red-600'>This field is required</p>}
            </div>
            <div className='flex flex-col md:ms-4'>
                <label className='text-md text-poppins text-md ms-1'>Location</label>
              <input className='border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-80 '
                {...register("location", {
                required: true,
                //valueAsNumber: true,
                })} type='text'
            />
            {errors?.location?.type === "required" && <p className='text-red-600'>This field is required</p>}
            </div>
            </div>
            <div className="flex flex-col mt-5 w-full">
              <label className='text-md text-poppins text-md ms-1'>Description </label>
              <ReactQuill theme="snow" value={description} onChange={addDescription} className='h-64 mb-12 w-full bg-white'/>
            </div>
            
      <input className='border border-black ms-5 px-8 py-3 mt-5 cursor-pointer hover:bg-black hover:text-white hover:border-white hover:border-2' type="submit" />
    </form>
    </div>     
    );
};

export default AddDonation;