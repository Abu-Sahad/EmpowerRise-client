import { useState, useEffect } from 'react';
import axios from 'axios';
import DonationPost from '../../Donation/Donation/DonationPost';
import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
    // Define a state variable to store the fetched data
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/donation')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='container mx-auto'>
            <div>
                <h1 className='text-black text-2xl font-bold font-poppins md:text-4xl lg:text-6xl mb-3 text-center'>Featured Projects</h1>
            </div>
            <div className="mt-7 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7">
                {data.slice(0, 6).map(single => <DonationPost key={single._id} post={single} />)}
            </div>
            <div className="flex justify-center items-center mt-4">
                <Link to='Donation'>
                    <button className='bg-cBlueGreen text-black hover:bg-cLightLightBlue px-4 py-3 rounded-md'>See More</button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProjects;
