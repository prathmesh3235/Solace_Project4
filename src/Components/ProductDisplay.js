import React from "react";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";


const ProductDisplay = ({ product, userId, mode, timeData }) => {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const handleClick = () => {
    const ref = doc(db, "users", userId);
    console.log("handleClick", timeData)
    let data = {
      "Clicked More Information": arrayUnion(product.product_name + " " + new Date()),
      "Time Spent on Presentation Section": timeData
    };
    try {
      setDoc(ref, data, { merge: true });
    } catch (err) {
      console.log(err);
    }
    
    const seenVersion = sessionStorage.getItem("productdetailsVersion");
    const productIdSecvence = sessionStorage.getItem("shuffledIDs");
    let nextVersion = JSON.parse(seenVersion)[JSON.parse(productIdSecvence).indexOf(product.id)];

    navigate(`/product/moreinfo?mode=${mode}&product_id=${product.id}&userId=${userId}&isGoodVersion=${nextVersion}`);
  };
  
  return (
    <Wrapper className="prodDispSec">
      <h2 className="heading"> Features</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "35px",
          marginBottom: "35px",
        }}
      >
        <div className="display-info">
          <ul className="product-info">
            <li className="product-info-i">
              <h3>
                {" "}
                <BsDot /> 	Price: $89.99{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <BsDot />	Color: {product.farbe}{" "}
              </h3>
            </li>
            {/* <li className="product-info-i">
              <h3>
                {" "}
                <BsDot /> Material: metal{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                {" "}
                <BsDot />	Lenses: quality glasses{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                {" "}
                <BsDot /> Sizes: small, medium, large{" "}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                {" "}
                <BsDot />	Free shipping and return{" "}
              </h3>
            </li> */}
            {/* <li className="product-info-i">
        
       <h3><AiOutlineArrowRight/> Extra Feature One </h3>
      </li>
      <li className="product-info-i">
        
       <h3><AiOutlineArrowRight/> Extra Feature Two </h3>
      </li> */}
            <li className="product-info-i">
              <h3>
                {" "}
                <a>
                  <Button onClick={handleClick}>
                    {" "}
                    <AiOutlineArrowRight /> More Information{" "}
                  </Button>
                </a>{" "}
              </h3>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`


position: relative;
padding:10px;
margin-top:10px;
margin-right:10px;
  .productDisplay: {
    display: 'flex',
    flexDirection: 'row';
    
  }
.display-info: {

}

.heading{
  // font-family: fantasy;

  margin-top: 0px;
  text-align: center;
  text-bold: bold;
  // margin-left:50px;
  
  text-decoration-color: Blue;
  text-decoration-thickness: 5px;
  font-weight: bold;
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

`;

export default ProductDisplay;
