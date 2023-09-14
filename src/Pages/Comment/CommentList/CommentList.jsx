import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReplyBox from '../ReplyBox/ReplyBox';
import ReplyList from '../ReplyList/ReplyList';

const CommentList = ({postId,type,commentReload}) => {
    const [list,setList] = useState([]);
    const [reload,setReload] = useState(null);

   useEffect(()=>{
    axios.post('http://localhost:5000/getCommentList',{postId})
    .then(res=>{setList(res.data)})
    .catch(err=>console.log(err))
   },[postId,commentReload]) 

    return (
        <div>
        { list.length>0 && <h1 className='text-2xl font-poppins mt-5'>Comment List </h1>}
            {
              list.map((item)=>
              <div key={item._id} className="border my-3 p-5">
                <div className="flex flex-row">
                    <img className='w-12 h-12 m-3 rounded-full' src={item.userImage} 
                       alt="User profile picture" />
                       <div className="flex flex-col">
                        <h2 className='mt-4 text-base text-gray-600'>{item.userName}</h2>
                        <h2 className='mt-1 text-xs text-gray-400'>{item.date}</h2>
                       </div>
                </div>
                <p className='ms-4'>{item.description}</p>
                  <ReplyBox setReload={setReload} commentId={item._id} />
                  <ReplyList reload={reload} commentId={item._id} />

            </div> 
            )}
            
        </div>
    );
};

export default CommentList;