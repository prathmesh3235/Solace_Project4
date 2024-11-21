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
    const productDetailsVersion = JSON.parse(sessionStorage.getItem("productdetailsVersion")) || [];

    console.log("Product", timeData);
    const ref = doc(db, "users", userId);
    const data = {
      "Clicked More Information": arrayUnion(product.product_name + " " + new Date()),
      "Time Spent on Presentation Section": arrayUnion(timeData.productName ? timeData : "Mobile view"),
    };
    await setDoc(ref, data, { merge: true });

    navigate(`/product/moreinfo?mode=${mode}&product_id=${product.id}&userId=${userId}&isV=${productDetailsVersion[shuffledIndex]}`);
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