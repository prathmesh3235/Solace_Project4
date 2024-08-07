// SecondHeader.js

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import products from "../data/product_data";
import LOGO from "../assets/Logo_SOLACE.png";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";

const SecondHeader = ({
  userId,
  onClickJetztKaufen,
  product_id,
  version,
  timeData,
}) => {
  const [mode, setMode] = useState("null");
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const modeParam = searchParams.get("mode");
    const productIdParam = searchParams.get("product_id");

    setMode(modeParam);
    setProductId(productIdParam);

    if (productIdParam) {
      const foundProduct = products.find(
        (product) => product.id == productIdParam
      );
      setProduct(foundProduct);
    }
  }, []);

  const handleClick = async (str) => {
    console.log("handleClick Jetzt Kaufen", timeData);
    if (userId) {
      // Update the database
      
      if (timeData) {
        const ref = doc(db, "users", userId);
        const data = {
          // "Clicked Buy Now": arrayUnion(
          //   product.product_name + " " + new Date()
          // ),
          "Time Spent on Presentation Section": arrayUnion(timeData),
        }; 


        console.log("Second header data", data)
        try {
          await setDoc(ref, data, { merge: true });
        } catch (err) {
          console.log(err);
        }
      } 
      onClickJetztKaufen(JSON.stringify(str) + " " + new Date());
      
    }
  };

  return (
    <MainHeader2 id="header">
      <div className="logoButton">
        <NavLink to={`/home?mode=${mode}&userId=${userId}`}>
          <div className="logo-img">
            <img
              src={LOGO}
              width="90px"
              height="70px"
              alt="my logo img"
              href="/home"
            />
          </div>
        </NavLink>
        <div>
          <NavLink
            to={`/home?mode=${mode}&userId=${userId}`}
            className="homeButton"
            onClick={() => handleClick("Home")}
          >
            <h5> Home</h5>
          </NavLink>
        </div>
      </div>

      <div>
        <NavLink
          onClick={() =>
            handleClick(product ? product.product_name : "Product")
          }
          to={`/thankyou?mode=${mode}&userId=${userId}&product_id=${product_id}&isV=${version}`}
          className="navbar-link-cart"
        >
          <div className="cartbutton">
            <BsCartCheckFill className="carticon" size={35} />
            <h3>Buy {product ? product.product_name : ""} Now</h3>
          </div>
        </NavLink>
      </div>
    </MainHeader2>
  );
};

const MainHeader2 = styled.header`
  background-color: #fce698;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .cartbutton {
    margin-top: 5px;
    font-size: 20px !important;
    margin-right: 5rem;
  }

  .carticon {
    margin-top: 1rem;
  }

  .homeButton h5 {
    font-size: 2.7rem !important;
    color: rgb(54, 79, 107);
    margin-top: 3rem;
    padding: 1rem;
    font-weight: bold;
  }
  .cartbutton h3 {
    // width: 50%;
    font-size: 21px;
    padding-top: 1.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .logoButton {
    display: flex;
  }
  .cartbutton {
    display: flex;
  }

  @media (max-width: 1024px) {
    .logoButton {
      width: 70% !important;
    }
  }

  @media (max-width: 918px) {
    .logoButton {
      width: 50% !important;
    }
  }

  @media (max-width: 767px) {
    .homeButton h5 {
      font-size: 2.5rem !important;
      color: rgb(54, 79, 107);
      margin-top: 2rem;
      margin-right: 2rem
      padding: 1rem;
      
      font-weight: bold;
    }
  }

  @media (max-width: 532px) {
    .logo-img {
      display: none;
    }
    .logoButton {
      width: 30% !important;
    }
    .cartbutton h3 {
      padding-top: 2rem;!important;
      font-size: 15px;!important;
    }
  }
`;

export default SecondHeader;
