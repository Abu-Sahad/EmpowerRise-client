import { faClock, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useDaysLeft from '../../../CustomHooks/useDaysLeft/useDaysLeft';
import { Link } from 'react-router-dom';

const FundPost = ({post}) => {
    const daysLeft = useDaysLeft(post.dayLeft);
    let collect = (post.collectedAmount/post.amount)*100;
    collect = collect.toFixed(2);

    return (
        <div className='shadow-md w-[320px] my-5 flex flex-col justify-center font-poppins mx-5'>
            <div className='w-full'>
              <img src={post.image} className='w-full h-[210px]' alt="post.title" />
            </div>
            {/* Details Container */}
            <div className='mx-7 mt-10'>
                <div className="flex flex-row">
                    <div className="bg-violet-600 px-3 mb-2 font-normal text-sm py-1 text-white font-poppins">{post.category}</div>
                    <div className={` ${post.status==='processing' ?'bg-blue-600' : post.status==='successful' ? 'bg-green-500' : 'bg-red-500' } px-3 mb-2 font-normal text-sm py-1 text-white font-poppins ms-2`}>{post.status}</div>
                </div>
                 <div className='flex flex-row'>    
                    <div className="text-sm mt-1 text-gray-500 ms-2 me-1 font-light"><FontAwesomeIcon icon={faClock} /></div>
                    <div className='text-sm text-gray-500 mt-1'>{Math.abs(daysLeft)} days {daysLeft>=0 ? 'left' : 'behind'}</div>
                    <div className="text-sm mt-1 text-gray-500 ms-5 font-light"><FontAwesomeIcon icon={faFaceSmile} /></div>
                    <div className='text-sm text-gray-500 mt-1 ms-1'>For {post.totalPeople} people</div>
                </div>
              <Link to={`/SingleFund/${post._id}`} className='text-[22px] font-bold text-black leading-6 mt-5 hover:text-violet-600 cursor-pointer'>{post.title} </Link>
              {/* <div className='mt-3 flex flex-col'>
                <div className="flex flex-row justify-between mb-2">
                    <p className='text-gray-400 text-sm '>Raised: ${post.collectedAmount}</p>
                    <p className='me-2 text-gray-400 text-sm '>{collect}%</p>
                </div>
                <progress className="progress progress-primary w-64 rounded-none" value={collect} max="100"></progress>
              </div> */}
              <h2 className='mt-3 mb-10 text-black font-black text-[16px]'>Goal : <span className='text-violet-500'>${post.amount} </span></h2>
            </div>
            
        </div>
    );
};

export default FundPost;