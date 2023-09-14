import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../component/SectionTittle/SectionTittle';
import img from '../../../assets/blogs/blogImage.jpg';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs data from the API
        axios.get('http://localhost:5000/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []);

    return (
        <section>
            <div>
                <SectionTitle img={img} tittle='Our Blog Here'></SectionTitle>
            </div>
            <div className="container p-4 max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map(blog => (
                        <div key={blog._id} className="bg-white p-4 shadow-md rounded-md transform transition-transform hover:scale-105">
                            <div className="mt-2">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-64 rounded-md"
                                />
                            </div>
                            <div className='flex justify-between'>
                                <p className="mt-2 text-gray-600">{blog.category}</p>
                                <p className="mt-2 text-gray-600">{blog.date}</p>
                            </div>
                            <Link to={`/blogs/${blog._id}`}>
                                <h2 className="text-xl font-semibold cursor-pointer mt-2 hover:text-teal-600 hover:text-2xl">{blog.title}</h2>
                            </Link>
                            <p className="mt-2 text-green-500">{blog.donation}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
