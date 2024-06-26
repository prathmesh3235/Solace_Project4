import React from "react";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

import { Button } from "./styles/Button";

const Products = ({ onClickMoreInfo }) => {
  return (
    <Wrapper>
      <h2 className="heading"> Product 1</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <img
          src="images/sunnyclubmaster.jpeg"
          alt="hero-section-photo"
          className="img-style"
        />
        <div className="display-info">
          <h2> SUNNY CLUBMASTER</h2>
          <ul className="product-info">
            <li className="product-info-i">
              <h3>
                {" "}
                <AiOutlineArrowRight /> 149€ (incl. shipping){" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <AiOutlineArrowRight /> Color: Gold / Gray Green{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                {" "}
                <BsDot /> Material: Metal{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <AiOutlineArrowRight /> Delivery in 2-4 working days{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <AiOutlineArrowRight /> Extra Feature One{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <AiOutlineArrowRight /> Extra Feature Two{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                {" "}
                <Button onClick={onClickMoreInfo}>
                  {" "}
                  More Information{" "}
                </Button>{" "}
              </h3>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`

border: 6px solid black;
margin: 100px;
position: relative;

  .productDisplay: {
    display: 'flex',
    flexDirection: 'row';
    
  }
.display-info: {

}

.heading{
  // font-family: fantasy !important;

  text-align: center;
  text-bold: bold;
  
  text-decoration-color: Blue;
  text-decoration-thickness: 5px
  font-weight: bold;
}
.product-info-i{
  margin-top:10px;

  button{
    background-color: red;
  }
  
}

.product-info: {
  alignItems: 'center',
  margin-top:30px;
}
.img-style{
  margin-top: 10px;
  width: 40%;
  height: auto;
  display: flex;
  justify-content: left;
  align-items: left;
}
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
