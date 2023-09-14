import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const AddBlog = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const defaultName = user ? user.displayName : ""; // Get the default name from the user context

    const onSubmit = (data) => {
        // Get the current date and time
        const currentDate = new Date();

        // Get the user's preferred locale
        const userLocale = navigator.language || "en-US";

        // Format the current date according to the user's locale
        const formattedDateTime = currentDate.toLocaleDateString(userLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const blogData = {
            ...data,
            name: defaultName,
            totalVisits: parseInt(data.totalVisits) || 0,
            date: formattedDateTime // Add the formatted date
        };

        axios.post('http://localhost:5000/blogs', blogData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.insertedId) {
                    console.log('blog added successfully');
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Blog added successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <div className="mb-4 mt-5 max-w-screen-xl mx-auto ">
            <h1 className="text-3xl font-bold mb-4 text-center">Add Blog</h1>
            <div className="card flex-shrink-0 shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        {/* Add blog attributes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="text"
                                    id="name"
                                    defaultValue={defaultName} // Set the default value
                                    {...register('name', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="text"
                                    id="title"
                                    {...register('title', { required: true })}
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                                    Image URL
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="text"
                                    id="image"
                                    {...register('image')}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                                    Category
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="text"
                                    id="category"
                                    {...register('category')}
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="totalPeople">
                                    Total People
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="number"
                                    id="totalPeople"
                                    {...register('totalPeople')}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="totalVisits">
                                    Total Visits
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="number"
                                    id="totalVisits"
                                    value="0" // Set the default value
                                    disabled // Disable editing

                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="donation">
                                    Donation
                                </label>
                                <input
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    type="number"
                                    id="donation"
                                    {...register('donation')}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                    id="description"
                                    {...register('description')}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <button
                                className="bg-[#dfdcaa] hover:bg-[#aebe70] text-white font-bold py-4 mt-4 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="submit"
                            >
                                Add Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddBlog;








