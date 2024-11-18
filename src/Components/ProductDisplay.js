import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";

const ProductDisplay = ({ product, userId, mode, timeData }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const productIdSequence = JSON.parse(sessionStorage.getItem("shuffledIDs"));
    const shuffledIndex = productIdSequence.indexOf(product.id);
  
    // Get current versions array
    let productDetailsVersion = JSON.parse(sessionStorage.getItem("productdetailsVersion"));
    
    // Track which products have been clicked in session storage
    let clickedProducts = JSON.parse(sessionStorage.getItem("clickedProducts") || "[]");
    
    if (!clickedProducts.includes(shuffledIndex)) {
      // Product hasn't been clicked before
      if (clickedProducts.length === 0) {
        // First ever click - keep the random initial value
      } else {
        // Not first click - set opposite of last clicked product
        const lastClickedIndex = clickedProducts[clickedProducts.length - 1];
        productDetailsVersion[shuffledIndex] = !productDetailsVersion[lastClickedIndex];
      }
      // Add to clicked products array
      clickedProducts.push(shuffledIndex);
      sessionStorage.setItem("clickedProducts", JSON.stringify(clickedProducts));
      sessionStorage.setItem("productdetailsVersion", JSON.stringify(productDetailsVersion));
    }
    // If product was already clicked, its version remains unchanged
  
    const ref = doc(db, "users", userId);
    let data = {
      "Clicked More Information": arrayUnion(product.product_name + " " + new Date()),
      "Time Spent on Presentation Section": arrayUnion(timeData.productName ? timeData : "Mobile view"),
    };
  
    try {
      await setDoc(ref, data, { merge: true });
      navigate(`/product/moreinfo?mode=${mode}&product_id=${product.id}&userId=${userId}&isV=${productDetailsVersion[shuffledIndex]}`);
    } catch (err) {
      console.error("Error during navigation or data update:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper className="prodDispSec">
      <h2 className="heading">Features</h2>
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
                <BsDot /> Price: $89.99
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <BsDot /> Color: {product.farbe}
              </h3>
            </li>
            <li className="product-info-i">
              <h3>
                <Button onClick={handleClick}>
                  <AiOutlineArrowRight /> More Information
                </Button>
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
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;

  .productDisplay {
    display: flex;
    flex-direction: row;
  }

  .display-info {
  }

  .heading {
    margin-top: 0px;
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
    // text-decoration-color: blue;
    text-decoration-thickness: 5px;
  }

  .product-info {
    align-items: center;
    margin-top: 30px;
  }

  .img-style {
    margin-top: 10px;
    width: 40%;
    height: auto;
    display: flex;
    justify-content: left;
    align-items: left;
  }
`;

export default ProductDisplay;
