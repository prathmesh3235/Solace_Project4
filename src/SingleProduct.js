import styled from "styled-components";
import React, { useState, useEffect } from "react";
import data from "./data/product_data";
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
  const product_id = urlParams.get("product_id");
  const [product, setProduct] = useState(
    data.filter((product) => product.id == product_id)[0]
  );
  const [mode, setMode] = useState(false);
  const [userId, setUserId] = useState(false);
  const [pageStartTime, setPageStartTime] = useState(0);
  const [initialTimeSpent, setInitialTimeSpent] = useState(0);
  const handleJetztKaufenClick = (data) => {
    console.log("check cart button", product_id);
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

  const image = [
    "images/3dproduct1.1.png",
    "images/3dproduct1.2.png",
    "images/3dproduct1.3.png",
    "images/3dproduct1.4.png",
    "images/3dproduct1.5.png",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Analytics tracking for Single Product Page
    const searchParams = new URLSearchParams(window.location.search);
    setMode(searchParams.get("mode"));
    setUserId(searchParams.get("userId"));

    // Record the time when the component mounts as page start time
    setPageStartTime(Date.now());
    setInitialTimeSpent(
      parseInt(sessionStorage.getItem("timeSpentOnSingleProductPage")) || 0
    );
  }, []);
  useEffect(() => {
    return () => {
      // Calculate the time spent on the page
      const pageEndTime = Date.now();
      const timeSpentInSeconds = (pageEndTime - pageStartTime) / 1000; // Calculate time spent in seconds
      sessionStorage.setItem(
        `timeSpentOnSingleProductPage_${product_id}`,
        initialTimeSpent + timeSpentInSeconds
      );
    };
  }, [pageStartTime]);

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
          />
        </div>

        <div className="uppersection">
          <div
            style={{
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          <h1 className="upperSectionHeading"> {product.product_name} </h1>
            {mode == "2" ? (
              <Videosection userId={userId} product={product} />
            ) : mode == "3" ? (
              <>
                <Model3D className="3dmodel-wrapper" product={product_id} mode={mode} />
              </>
            ) :  mode == "4" ? (
              <>
                <Model3D className="3dmodel-wrapper" product={product_id} mode={mode} />
              </>
            ) :(
              <iframe
                className="VRiframe"
                src={
                  "https://virtual-tryon-five.vercel.app/?sku=" + product.sku
                }
                title="Virtual Try On"
                frameBorder="0"
                width="500"
                height="400"
                allow="camera; microphone al"
              />
            )}
          </div>
        </div>

        <div className="single-product-page">
          {/* <div className="slider-block">
            {" "}
            <Productpage userId={userId} product={product} mode={mode} />
          </div> */}
          <div className="prod-disp">
            <ProductDisplay userId={userId} product={product} mode={mode} />
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
      /* height: 0.2rem; */
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
