import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from'styled-components'
import {Button }from '../styles/Button'
import ReactGA from 'react-ga4';

const HeroSection = ({ myData, userId}) => {
  
  const handleClick = () => {
   ReactGA.event({
    category: "clicked shop Now ",
    action: userId,
   });

    const element = document.getElementById('productList');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

    }
  }
  return (
<Wrapper> 
  <div className="container">
      <div className="grid grid-two-coloumn homePage">
        <div className="hero-section-data">
          <p className="intro-data"> Welcome to</p>
          <h1> SOLACE</h1>
          <p>  Where Serenity Meets Fashion </p>
          <NavLink> 
              <Button className='btn' onClick={handleClick}> Shop Now</Button>

          </NavLink>
        </div>  
        <div className="hero-section-image">
            <figure>
                <img src="images/hero.jpg" alt="hero-section-photo" className="img-style"/>
            </figure>
        </div>
    </div>
  </div>

    
</Wrapper>

    
  )
};

const Wrapper = styled.section`

.container{
  margin-top: 80px;
  margin-bottom:10px;
}
  padding: 15rem -1;
  img {
    min-width: 10rem;
    height: 10rem;
  }

  
  .hero-section-data {
    
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }
  .hero-section-image {
    margin-top: 10px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: right;
    align-items: right;
    margin-right: 80px;
  }

  .Product-display-image{
    margin-top: 1rem;
    display: flex;
    justify-content: left;
    align-items: left;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: #364F6B;
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .homePage {
    display: flex;
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      // gap: 10rem;
    }
    figure::after {
      // content: "";
      // width: 50%;
      // height: 100%;
      // left: 0;
      top: 10%;
      /* bottom: 10%; */
      //background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;


export default HeroSection; 