import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCampaign = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [imageTexts, setImageTexts] = useState([]);

   useEffect(()=>{
    axios.get('http://localhost:5000/getCampainDonation')
    .then(res=>{
       const imageUrls = res.data.map(item => item.image);
        const textData = res.data.map(item => ({ title: item.title, description: (item.description).slice(0,200),_id:item._id }));
        setImages(imageUrls);
        setImageTexts(textData);
    })
    .catch(err=>console.error(err));
   },[])

   // console.log("images ",imageTexts[0].description.slice(0, 4))

    const goToNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(nextIndex);
    };

    const goToPreviousImage = () => {
        const previousIndex =
            (currentImageIndex - 1 + images.length) % images.length;
        setCurrentImageIndex(previousIndex);
    };

    return (
        <section className=" mb-10">

            {imageTexts.length >0 && <div className="container mx-auto relative flex">
                {/* Left Side Image */}
                <div className="w-1/2 p-4 ">
                    <img
                        src={images[currentImageIndex]}
                        alt="Campaign"
                        className="w-full h-auto  md:h-[400px]"
                    />
                    <div className='absolute w-[400px] h-[300px] top-4 left-[35%]  bg-white p-4 box-border shadow-lg'>
                        <h1 className="text-lg font-bold mb-2 mt-2 ">{imageTexts[currentImageIndex].title}</h1> 
                         <div dangerouslySetInnerHTML={{ __html: imageTexts[currentImageIndex].description }} className="text-sm text-justify mb-2" />
                        <div className='flex justify-start'>
                            <Link to={`/SingleDonation/${imageTexts[currentImageIndex]._id}`} className=" mt-2 mb-2 bg-blue-500 text-white p-3 rounded-md">Donate</Link>
                        </div>
                    </div>
                </div>
               

                {/* Right Side Buttons */}
                <div className="lg:absolute bottom-0 left-[62%] mb-6 mr-6 flex items-center space-x-2">
                    <button
                        onClick={goToPreviousImage}
                        className="w-10 h-10 bg-transparent border border-black rounded-full hover:bg-cLightDarkBlue text-black"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={goToNextImage}
                        className="w-10 h-10 bg-transparent border border-black rounded-full hover:bg-cLightDarkBlue text-black ml-2"
                    >
                        &gt;
                    </button>
                </div>
            </div>
             }
        </section>
    );
};

export default FeaturedCampaign;
