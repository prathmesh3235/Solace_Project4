import React, { useState } from "react";
import styled from "styled-components";
import product_card from "../data/product_data"
const Model3D = ({ product, mode}) => {
  const [section, setSection] = useState(3);
  let imageUrl
  
  if (mode=='3') {
    imageUrl = product_card[product - 1].male1.split(".")[1] + "." + section + ".png";
  }
  else if (mode=='4') {
    imageUrl = "images/Gold_Female1" + "." + section + ".png";
  }

  return (
    
    <Wrapper
      style={{
        width: "100%",
      }}
    >
      <div
        className="3dmodel-wrapper"
        style={{
          backgroundImage: `url(${product ? imageUrl : ""})`,
          // width: "900px",
        }}
      >
        <ul className="list">
          {/* <li value={0} onMouseEnter={(e) => setSection(e.target.value)}></li> */}
          <li value={1} onMouseEnter={(e) => setSection(e.target.value)}></li>
          <li value={2} onMouseEnter={(e) => setSection(e.target.value)}></li>
          <li value={3} onMouseEnter={(e) => setSection(e.target.value)}></li>
          <li value={4} onMouseEnter={(e) => setSection(e.target.value)}></li>
          <li value={5} onMouseEnter={(e) => setSection(e.target.value)}></li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default Model3D;
const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    .list li {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ul {
    }

    .list {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 50rem;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    div {
      width: 60%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    @media screen and (max-width: 767px) {
      .list {
        height: 40rem;
      }
      div {
        width: 95%;
      }
    }
    @media screen and (max-width: 320px) {
      .list {
        height: 30rem;
      }
    }
  `;
