import styled from "styled-components";
import React, { useState, useEffect } from "react";
import product_card from "./data/product_data"; // Ensure the correct import path
import Productpage from "./Components/Productpage";
import ProductDisplay from "./Components/ProductDisplay";
import Footer from "./Components/Footer";
import Videosection from "./Components/Videosection";
import SecondHeader from "./Components/SecondHeader";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "./services/firebase";
import Model3D from "./Components/Model3D";

const SingleProduct = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = parseInt(urlParams.get("product_id"), 10); // Ensure product_id is a number
  const [product, setProduct] = useState({});
  const [mode, setMode] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pageStartTime, setPageStartTime] = useState(0);
  const [initialTimeSpent, setInitialTimeSpent] = useState(0);
  const [upperSectionStartTime, setUpperSectionStartTime] = useState(null);
  const [timeData, setTimeData] = useState();
  const [timeSpentInUpperSection, setTimeSpentInUpperSection] = useState(0);
  
  const seenVersion = sessionStorage.getItem("productdetailsVersion");
  const productIdSecvence = sessionStorage.getItem("shuffledIDs");
  let version = JSON.parse(seenVersion)[JSON.parse(productIdSecvence).indexOf(product.id)];
  


  const handleJetztKaufenClick = (data) => {
    const ref = doc(db, "users", userId);
    try {
      setDoc(
        ref,
        { "Clicked Jetzt Kaufen": arrayUnion(data) },
        { merge: true }
      );
    } catch (err) {
      console.log("error cart button");
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeSpentInUpperSection(0)

    // Analytics tracking for Single Product Page
    const searchParams = new URLSearchParams(window.location.search);
    setMode(searchParams.get("mode"));
    setUserId(searchParams.get("userId"));

    // Record the time when the component mounts as page start time
    setPageStartTime(Date.now());
    // Find the product
    const product = product_card.find((product) => product.id === product_id);
    setProduct(product);

    setInitialTimeSpent(
      parseInt(sessionStorage.getItem(`timeSpentOnSingleProductPage_${product.product_name}`)) || 0
    );

  }, [product_id]);

  useEffect(() => {
    return () => {
      if (product.product_name) {
        // Save the time spent on the page
        const pageEndTime = Date.now();
        const timeSpentInSeconds = (pageEndTime - pageStartTime) / 1000; // Calculate time spent in seconds
        sessionStorage.setItem(
          `timeSpentOnSingleProductPage_${product.product_name}`,
          initialTimeSpent + timeSpentInSeconds
        );
      }
    };
  }, [pageStartTime, initialTimeSpent, product_id, product]);

  useEffect(() => {
    const upperSectionDiv = document.querySelector(".uppersection");
    const singelProductPage = document.querySelector(".single-product-page");
    const secondHeader = document.querySelector(".secondHeader");

    const handleMouseEnter = () => {
      console.log("Entering")
      setUpperSectionStartTime(Date.now());
    };

    const handleMouseLeave = async () => {

      if (upperSectionStartTime) {
        setTimeSpentInUpperSection(timeSpentInUpperSection + (Date.now() - upperSectionStartTime) / 1000)

        // Save the time spent in Firebase
        if (userId) {
          // const ref = doc(db, "users", userId);
          try {
            console.log("I ma here", timeSpentInUpperSection + (Date.now() - upperSectionStartTime) / 1000)
            // await setDoc(
            //   ref,
            //   { "Time Spent on Presentation Section": arrayUnion({ productName: product.product_name, timeSpentInUpperSection }) },
            //   { merge: true }
            // );
          } catch (err) {
            console.log("Error saving time spent in upper section:", err);
          }
        }
      }
    };
    if (upperSectionDiv && mode != 1) {
      upperSectionDiv.addEventListener("mouseenter", handleMouseEnter);
      upperSectionDiv.addEventListener("mouseleave", handleMouseLeave);
    } else if (upperSectionDiv && singelProductPage && mode == 1 && secondHeader) {
      upperSectionDiv.addEventListener("mouseenter", handleMouseEnter);
      singelProductPage.addEventListener("mouseenter", handleMouseLeave);
      secondHeader.addEventListener("mouseenter", handleMouseLeave);
    }

    return () => {
      if (upperSectionDiv && mode != 1) {
        upperSectionDiv.removeEventListener("mouseenter", handleMouseEnter);
        upperSectionDiv.removeEventListener("mouseleave", handleMouseLeave);
      } else if (upperSectionDiv && singelProductPage && mode == 1 && secondHeader) {
        upperSectionDiv.addEventListener("mouseenter", handleMouseEnter);
        singelProductPage.addEventListener("mouseenter", handleMouseLeave);
      }
    };
  }, [upperSectionStartTime, userId, product_id]);

  useEffect(() => {
    setTimeData({ productName: product.product_name, timeSpentInUpperSection })
  }, [timeSpentInUpperSection])

  if (!product) {
    return <div>Loading...</div>; // Display a loading message or a fallback UI
  }

  return (
    <Wrapper
      style={{
        padding: 0,
      }}
    >
      <div className="abc">
        <div className="secondHeader">
          <SecondHeader
            userId={userId}
            onClickJetztKaufen={handleJetztKaufenClick}
            product_id={product_id}
            version={version}
            timeData={timeData}
          />
        </div>
        {JSON.stringify(timeData)}
        <div className="uppersection">
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="upperSectionHeading"> {product.product_name} </h1>
            {mode === "2" ? (
              <Videosection userId={userId} product={product} />
            ) : mode === "3" || mode === "4" ? (
              <>
                <Model3D className="3dmodel-wrapper" product={product_id} mode={mode} />
              </>
            ) : (
              <iframe
                className="VRiframe"
                src={"https://virtual-tryon-five.vercel.app/?sku=" + product.sku}
                title="Virtual Try On"
                frameBorder="0"
                width="750"
                height="500"
                allow="camera; microphone al"
              />
            )}
          </div>
        </div>

        <div className="single-product-page">
          <div className="prod-disp">
            {/* {JSON.stringify(timeData)} */}
            <ProductDisplay userId={userId} product={product} mode={mode} timeData={timeData} />
          </div>
        </div>
        <Footer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 3.2rem;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .3dmodel-wrapper {
    margin: auto;
  }
  .VRiframe {
    margin-top: 2rem;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
