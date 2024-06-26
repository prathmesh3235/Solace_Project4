import React from 'react'
import HeroSection from './Components/LandingPage'
import { useProductContext } from "./Context/Productcontext";

const About=()=>{
   

  const data = 
          {
      name: "Sunny Sunglasses",
      description:" This is the content of the about page",
          };
  return <HeroSection myData = {data} />;
};

export default About