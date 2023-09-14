import { useEffect, useState } from "react"
import {getDownloadURL, ref, uploadBytes, getStorage} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {app} from '../../firebase/firebase.config';

const useImageUpload = (image,processing) =>{
    const [url,setUrl] = useState(null);
    const [error,setError] = useState(null);
      const uniqueId = uuidv4();
     const Storage = getStorage(app);
        
     const uploadImages = async () => {
        console.log("testing")
        if(processing){
            const imageName = `${uniqueId}_${image.name}`;
        const imageRef = ref(Storage, `empowerRise/image/${imageName}`);
        try {
            const snapshot = await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);
            setUrl(imageUrl);
            console.log("url ",imageUrl)
        } catch (err) {
            //console.error("Error uploading image:", err);
            setError(err);
            return null;
        }
        }
        
    };

    useEffect(()=>{
       const fetchData = async()=>{
       await uploadImages();
       }
       fetchData();
       
    }
    ,[processing])

    return {url,error};
}

export default useImageUpload;