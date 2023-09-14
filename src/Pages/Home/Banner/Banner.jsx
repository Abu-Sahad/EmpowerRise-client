import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div className="lg:h-full lg:w-full">
            <Carousel >
                <div className="relative lg:h-[90vh]">
                    <img className="h-full" src="https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/rev_sliderhome1.jpg" alt="Banner Image" />
                    <div className="absolute top-[25%] md:top-[35%] lg:top-[35%] left-1/2 transform -translate-x-1/2 p-4 bg-opacity-0  text-white transition-transform hover:-translate-y-2 ">
                        <p className="text-orange-400 lg:text-xl mb-2">We Offer Can You Help</p>
                        <h1 className="lg:text-6xl font-bold font-serif leading-tight sm:text-2xl md:text-3xl">BETTER <br /> WORLD FOR OUR <br /> CHILDREN</h1>
                    </div>
                </div>
                <div className="relative lg:h-[90vh]">
                    <img className="h-full" src="https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/rev_sliderhome2.jpg" alt="Banner Image" />
                    <div className="absolute top-[25%] md:top-[35%] lg:top-[35%] left-1/2 transform -translate-x-1/2 p-4 bg-opacity-0  text-white transition-transform hover:-translate-y-2 ">
                        <p className="text-orange-400 lg:text-xl mb-2">We Offer Can You Help</p>
                        <h1 className="lg:text-6xl font-bold font-serif leading-tight sm:text-2xl md:text-3xl">GIVING IS THE<br /> GREATEST  <br/> ACT OF GRACE</h1>
                    </div>
                </div>
                
            </Carousel>
        </div>
    );
};

export default Banner;
