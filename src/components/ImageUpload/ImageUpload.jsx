import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import {app} from '../../firebase/firebase.config'
import {useState} from 'react';
const ImageUpload = ({handleImage,setHandleImage}) => {
        const [selectedImages, setSelectedImages] = useState([]);
        const uniqueId = uuidv4();
        const Storage = getStorage(app);

    const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedImages(files);
    };
       
    const uploadImages = async () => {
        const imageName = `${uniqueId}_${selectedImages.name}`;
        const imageRef = ref(Storage, `threadZone/image/${imageName}`);
        try {
            const snapshot = await uploadBytes(imageRef, selectedImages[0]);
            const imageUrl = await getDownloadURL(snapshot.ref);
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const submitImage = async () => {
 
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'info',
      title: 'Waiting for image being uploaded !! '
    })
    const allImage = await uploadImages();
    setHandleImage(allImage);
    console.log("all Images ", allImage);
}

// useEffect(()=>{
//     submitImage();
// },[handleImage])

    return (
        <>
            
        </>
    );
};

export default ImageUpload;