import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SectionTitle from '../../../component/SectionTittle/SectionTittle';
import img from '../../../assets/blogs/blogImage.jpg'
import Comment from '../../Comment/Comment';

const BlogsDetails = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Fetch blog details from the server API
        axios.get(`http://localhost:5000/blogs/${id}`) // Replace with your server URL
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (

        <section>
            <div>
                <SectionTitle img={img} tittle={blog.title} ></SectionTitle>
            </div>
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-wrap justify-center mb-10">
                    <div className="w-full lg:w-3/4 bg-white p-4 shadow-md rounded-md ">
                        <img
                            src={blog.image} // Replace with the image URL from the blog data
                            alt={blog.title}
                            className="w-full h-auto rounded-md mb-4 lg:mb-0"
                        />
                        <div className="">
                            {/* <div>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2 mt-10">
                                    {blog.category}
                                </button>
                            </div> */}
                            <div className='flex justify-between mt-10'>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2">
                                    {blog.category}
                                </button>
                                <p className="mt-2 text-gray-600">{blog.date}</p>
                            </div>
                            <div className='flex mb-2'>
                                <h1 className="text-xl font-bold">Name:</h1>
                                <p className="text-xl ps-2">{blog.name}</p>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                            <div className='flex mb-2'>
                                <h1 className="text-xl font-bold">Donation:</h1>
                                <p className=" ps-2 text-xl">{blog.donation}</p>
                            </div>
                            <div className='flex mb-2'>
                                <h1 className="text-xl font-bold">Total People:</h1>
                                <p className=" ps-2 text-xl">{blog.totalPeople}</p>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold mt-3">Short Story:</h1>
                                <p className="mt-4">{blog.description}</p>
                            </div>
                            <Comment type='donation' postId={id}/> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogsDetails;
