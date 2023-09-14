import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
//import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
//import { v4 as uuidv4 } from 'uuid';
//import { app } from '../../../../firebase/firebase.config';
const AddCategory = ({ categoryList }) => {
    const [categoryName, setCategoryName] = useState('');

    //for image upload 
   // const Storage = getStorage(app)
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedImages([...files]);
    };

   // const uniqueId = uuidv4();
    // const uploadImages = async () => {
    //     const imageName = `${uniqueId}_${selectedImages[0].name}`;
    //     const imageRef = ref(Storage, `threadZone/image/${imageName}`);

    //     try {
    //         const snapshot = await uploadBytes(imageRef, selectedImages[0]);
    //         const imageUrl = await getDownloadURL(snapshot.ref);
    //         return imageUrl;
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //         return null;
    //     }
    // };


    const handleCategory = async (e) => {
        e.preventDefault();
        for ( let category of categoryList) {
            if (category.category === categoryName) {
                Swal.fire({
                    title: ` "${categoryName}" is already Exist !!`,
                    icon: 'error',
                })
                // console.log("Category Looping test ");
                return;
            }
        }
        if (categoryName.length < 3) {
            Swal.fire({
                title: 'Name must have 3 latter !!',
                icon: 'question',
            })
        } else {
           // const imageURL = await uploadImages();
          //  console.log("Image url => ", imageURL);
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: 'center',
            //     showConfirmButton: false,
            //     timer: 3000,
            //     timerProgressBar: true,
            //     didOpen: (toast) => {
            //         toast.addEventListener('mouseenter', Swal.stopTimer)
            //         toast.addEventListener('mouseleave', Swal.resumeTimer)
            //     }
            // })

            // Toast.fire({
            //     icon: 'info',
            //     title: 'Wait for image upload'
            // })
                const categoryObject = {
                    category: categoryName,
                  //  image: imageURL,
                    categoryImage:'https://i.ibb.co/g3w0ZL1/jugs-ge2ea5a682-1280.jpg',
                    totalItem:0
                }
                axios.post('http://localhost:5000/addCategory', categoryObject)
                    .then((res) => {
                        if (res.data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Add successfully'

                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        }
    }
    return (
        <div className='ms-14 mt-10 my-10'>
            <form method="post" className='flex flex-col'>
                <input type="file" onChange={handleImageChange} placeholder="Category Image" name='categoryImage' className="input input-bordered w-[280px] max-w-xs mx-5 my-3 border" required />
                <input type="text" name="Category" id="category" onBlur={(e) => { setCategoryName(e.target.value) }} placeholder='Add Category' className="input input-bordered w-[280px] max-w-xs mx-5 my-3 border" />
                <button type="submit" onClick={handleCategory} className='btn btn-info text-white mt-5 w-36 ms-5 font-medium font-poppins'>Add Category</button>
            </form>
        </div>

    );
};

export default AddCategory;