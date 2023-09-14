import React from 'react';
import img from '../../assets/blogs/blogImage.jpg'
const HeroSection = () => {

    const divStyle = {
    backgroundImage: img,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '300px',
  };
    return (
        <div style={divStyle}>
           <h2>Testing text</h2>
        </div>
        
    );
};

export default HeroSection;