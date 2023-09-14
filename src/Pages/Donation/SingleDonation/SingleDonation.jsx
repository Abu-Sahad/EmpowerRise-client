import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDaysLeft from '../../../CustomHooks/useDaysLeft/useDaysLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCompass } from '@fortawesome/free-regular-svg-icons';
import DonationPayment from './DonationPayment';
import DonatedPeple from './DonatedPeple';
import Comment from '../../Comment/Comment';
import SectionTitle from '../../../component/SectionTittle/SectionTittle';

const SingleDonation = () => {
    const {id} = useParams();
    //states
    const [details,setDetails] = useState({});
    const [user,setUser] = useState(null);
    const [reload,setReload] = useState(0);
  //  console.log("user ",user)
    //calculation 
    let collect = (details.collectedAmount/details.amount)*100;
    collect = collect.toFixed(2);
    const daysLeft = useDaysLeft(details.dayLeft);

   // console.log("user info ",user);

    //effect
    useEffect(()=>{
        axios.post('http://localhost:5000/getSingleDonation',{id:id})
        .then(res=>{
            setDetails(res.data.post[0]);
            setUser(res.data.user[0]);
        })
        .catch(err=>console.log(err));
    },[reload])

    return (
    <>
    <SectionTitle img={details.image} tittle={details.title} />
     <div className="container font-poppins mb-36 mt-8">
       <div className="flex flex-col md:flex-row">
         <div className="w-full md:w-3/5 md:h-[480px]"> 
           <img className='w-full md:w-[670px] md:h-full flex justify-center' src={details.image} alt={details.title} />
         </div>
         <div className="w-full md:w-2/5 ms-10">
            <div className="flex flex-col">
              <h2 className="text-3xl font-black hover:text-violet-600 capitalize">
                {details.title}
              </h2>
              <div className=' mt-5 divide-y'>
                <div className="flex justify-between font-light text-xs">
                    <h2 className='bg-violet-200 text-violet-600 px-2'>{details.donatedPeople} people donated Money</h2>
                    <p className='bg-violet-200 text-violet-600 px-2 me-16'>{collect}%</p>
                </div>
                <progress className="progress progress-primary w-80 md:w-96 rounded-none" value={collect} max="100"></progress>
                <div className='mt-4'>
                    <h2 className='text-4xl leading-10 font-black mt-2'>${details.collectedAmount}</h2>
                     <div className='flex flex-row'>
                       <p className='mt-2 text-gray-400 font-light'>raised of</p> 
                       <p className='text-black mt-2 ms-2'>  ${details.amount} </p> 
                     </div>
                     <p className="text-sm font-light text-gray-400"><span className='text-black font-normal'>{collect}%</span> of total money is collected</p>
                     <p className="text-sm font-light text-black"><FontAwesomeIcon icon={faClock} className='me-2' />{ Math.abs(daysLeft)} {`${daysLeft===1 ? 'day': 'days'} `}<span className='font-light text-gray-400 ms-2'>{daysLeft>0 ? 'left' : 'behind'} for donation </span></p>
                     <p className="text-md text-gray-400 font-light "><span className='font-normal text-black'><FontAwesomeIcon icon={faCompass} className='me-2' />{details.location}</span> city </p>
                     <div className="flex flex-row mt-2">
                    <div className="bg-violet-600 px-3 mb-2 font-normal text-sm py-1 text-white font-poppins">{details.category}</div>
                    <div className="bg-blue-600 px-3 mb-2 font-normal text-sm py-1 text-white font-poppins ms-2">{details.status}</div>
                </div>
                </div>
                <div className="mt-8 mb-6">
                 {user &&  <div className="flex flex-row mt-8">
                    <img src={user.photoURL} alt={user.name} className='rounded-full ring-violet-600 ring-4 ms-4 border-4 w-20 h-20 border-white'/>
                    <div className="flex flex-col ms-3 mt-3">
                    <h2 className='text-xl font-bold'>{user.name}</h2>
                    <p className='text-sm text-gray-500'>Member</p>
                    <p className='text-xs text-gray-400'>{details.location}</p>
                  </div>
                  </div>
                  }
                </div>
                <div className='my-5'>
                  {details.status==='processing' && <DonationPayment details={details} user={user} setReload={setReload} />}
                </div>
                

              </div>
            </div>
         </div>

        </div>
        <div className="flex flex-col-reverse md:flex-row ">
           <div className="w-full md:w-3/5 "> 
           <div dangerouslySetInnerHTML={{ __html: details.description }} className='text-justify md:me-16 ms-8'/>
           <Comment type='donation' postId={id}/> 
         </div>
         <div className="w-full md:w-2/5"> 
          <DonatedPeple postId={details._id} reload={reload}/>
          </div>
       </div>
     </div>
    </>
    );
};

export default SingleDonation;