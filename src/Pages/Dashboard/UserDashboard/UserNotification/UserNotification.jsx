import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserInfo from '../../../../CustomHooks/useUserInfo/useUserInfo';
import Swal from 'sweetalert2';

const UserNotification = () => {
    const [list,setList] = useState([]);
    const {userId} = useUserInfo();

    //effect 
    useEffect(()=>{
     axios.post('http://localhost:5000/getUserNotification',{userId})
     .then(res=>setList(res.data))
     .catch(err=>console.log(err))
    },[userId])

    //function 
    const handleRead = (id) => {
    axios.post('http://localhost:5000/updateNotification', {id})
      .then(res => {
        if (res.data.status) {
          Swal.fire({
            icon: 'success',
            title: 'Mark as Read',
            timer: 1500
          })
          const updatedNotifications = list.map(notification => {
            if (notification._id === id) {
              return { ...notification, isRead: true };
            }
            return notification;
          });
          setList(updatedNotifications);
        }
      })
      .catch(err => console.log(err));
  }

  const deleteNotification = (id) => {
    axios.post('http://localhost:5000/deleteNotification', {id})
      .then(res => {
        if (res.data.status) {
          Swal.fire({
            icon: 'warning',
            title: 'Delete Notification',
            timer: 1500
          })
          const newNot = list.filter(item => item._id !== id);
          setList(newNot);
        }
      })
      .catch(err => console.log(err));
    }

    return (
           <div className='flex flex-col'>
      <h2 className="text-center text-xl font-poppins">Notification List </h2>
      <div className="divide-y mr-8 ms-5">
        {
          list.map((item) =>
            <div key={item._id} className="container flex flex-row  my-2 justify-between">
              <h2 className='text-poppins ms-5 mt-3'>{item.description}</h2>
              <div className="flex flex-row">
                <button type="button"
                  className={`px-3 py-1 mt-2 text-white font-poppins rounded-md ${item.isRead ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-green-400 hover:bg-green-600'}`} onClick={() => { handleRead(item._id) }}
                  disabled={item.isRead}
                >
                  {item.isRead ? 'Read' : 'Mark as Read '}</button>
                <button type="button" className='px-3 py-1 mt-2 bg-red-400 hover:bg-red-600 text-white font-poppins rounded-md  ms-5'
                  onClick={() => { deleteNotification(item._id) }}
                >Delete </button>
              </div>


            </div>
          )
        }
      </div>



    </div>
    );
};

export default UserNotification;