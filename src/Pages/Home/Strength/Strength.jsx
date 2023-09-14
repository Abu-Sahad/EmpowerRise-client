import React from 'react';

const Strength = () => {
    // Define an array of image URLs for each row
    const imageUrls = [
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-1.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-2.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-3.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-4.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-5.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-6.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-7.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-8.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-9.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-10.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-11.png',
        'https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/brand-12.png',
    ];

    return (
        <div className='mb-10 container mx-auto'>
            <div>
                <div className="bg-cBlueGreen p-4 shadow-md mb-4 text-center rounded-md">
                    <h1 className="text-black text-2xl font-bold font-poppins md:text-4xl lg:text-6xl mb-3 pt-10 uppercase">Unity Makes Strength</h1>
                    <p className="text-black text-lg lg:text-xl pb-10">Our partners are from all over the world...</p>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {imageUrls.map((imageUrl, index) => (
                    <div key={index} className=" p-4 bg-opacity-20 bg-white text-white">
                        <img src={imageUrl} alt={`Brand ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Strength;
