import React, { useState } from 'react';
import useUserInfo from '../../../CustomHooks/useUserInfo/useUserInfo';
import useDateNow from '../../../CustomHooks/useDateNow/useDateNow';
import axios from 'axios';
import Swal from 'sweetalert2';

const CommentBox = ({postId,type,setCommentReload}) => {
    const [description,setDescription] = useState('');
    
    //custom Hook
    const {userId,name,photoURL} = useUserInfo();
    const {dateNow} = useDateNow();

    //function 
    const handleSubmit = ()=>{
        const comment = {
            postId,
            type,
            userId,
            userName:name,
            userImage:photoURL,
            description,
            date:dateNow
        }
        axios.post('http://localhost:5000/addComment',comment)
        .then(res=>{
            if(res.data.status){
                Swal.fire({
                    title:'Comment Add Successfully',
                    text:'Check post comment section',
                    timer:1000,
                    icon:'success'
                })
            } else {
                Swal.fire({
                    title:'Comment Not Added',
                    text:'Something went wrong',
                    timer:1000,
                    icon:'error'
                })
            }
            setDescription('');
            setCommentReload(Math.random());
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
          <form method="post" className='flex flex-col'>
            <textarea className='border border-gray-400 mb-4 ms-8 md:ms-0 p-3' onBlur={(e)=>{setDescription(e.target.value)}} defaultValue={description} name="description" cols="40" rows="5"></textarea>
            <button type="button" className='btn btn-primary w-44 ms-8 md:ms-0' onClick={handleSubmit}>Comment</button>
          </form>
        </div>
    );
};

export default CommentBox;