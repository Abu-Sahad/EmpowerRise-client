import About from "../About/About";
import Banner from "../Banner/Banner";
import Blog from "../HomeBlog/HomeBlog";
import FeaturedProjects from "../FeaturedProjects/FeaturedProjects";

import FeaturedCampaign from "../FuturedCampian/FuturedCampian";
import SemiBanner from "../SemiBanner/SemiBanner";
import Strength from "../Strength/Strength";


const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <FeaturedProjects></FeaturedProjects>
            <About></About>
            <SemiBanner></SemiBanner>
            <FeaturedCampaign></FeaturedCampaign>
            <Blog></Blog>
            <Strength></Strength>



        </div>
    );
};

export default Home;