import {useState} from 'react';
import useUserInfo from '../../../CustomHooks/useUserInfo/useUserInfo';
import useDateNow from '../../../CustomHooks/useDateNow/useDateNow';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReplyBox = ({commentId,setReload}) => {
    
    const [addReply,setAddReply] = useState(false);
    const [reply,setReply] = useState('');

    //custom Hook
    const {userId,name,photoURL} = useUserInfo();
    const {dateNow} = useDateNow();

    //function 
    const replyHandler = ()=>{
       const data = {
        commentId,
        userId,
        userName:name,
        userImage:photoURL,
        date:dateNow,
        reply
       }
    
       axios.post('http://localhost:5000/addReply',data)
       .then(res=>{
            if(res.data.status){
                Swal.fire({
                    title:'Reply Add Successfully',
                    text:'Check post comment section',
                    timer:1000,
                    icon:'success'
                })
            } else {
                Swal.fire({
                    title:'Reply Not Added',
                    text:'Something went wrong',
                    timer:1000,
                    icon:'error'
                })
            }
            setReply('');
        })
        .catch(err=>console.log(err))
     setAddReply(false);
     setReload(Math.random());
    }

    return (
        <div>
           <button className='btn btn-ghost text-sm font-poppins' 
                   onClick={()=>{setAddReply(!addReply)}}>Reply</button> 
               {addReply && <form method="post">
                    <input type="text" name="reply" onBlur={(e)=>{setReply(e.target.value)}} className='border border-gray-300 rounded-md h-10 ps-2 w-96 me-4' />
                    <button className='btn btn-ghost text-sm font-poppins' onClick={replyHandler}>Add Reply</button>
                </form>
                 } 
        </div>
    );
};

export default ReplyBox;