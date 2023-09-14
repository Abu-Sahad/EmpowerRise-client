import axios from 'axios';
import { useEffect, useState } from 'react';

const ReplyList = ({commentId,reload}) => {
    const [list,setList] = useState([]);

    useEffect(()=>{
        axios.post('http://localhost:5000/getReplyList',{commentId})
        .then(res=>setList(res.data))
        .catch(err=>console.log(err))
    },[commentId,reload])
    
    return (
        <>
            {
              list.map((item)=>
              <div key={item._id} className="border my-1 p-1 ">
                <div className="flex flex-row">
                    <img className='w-12 h-12 m-3 rounded-full' src={item.userImage} 
                       alt="User profile picture" />
                       <div className="flex flex-col">
                        <h2 className='mt-4 text-base text-gray-600'>{item.userName}</h2>
                        <h2 className='mt-1 text-xs text-gray-400'>{item.date}</h2>
                       </div>
                </div>
                <p className='ms-4'>{item.reply}</p>
                  

            </div> 
            )}
        </>
    );
};

export default ReplyList;