import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import SecondHeader from "./Components/SecondHeader";
import Footer from "./Components/Footer";
import styled from "styled-components";
import data from "./data/product_data";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "./services/firebase";

const MoreinfoNegative = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.href,
    title: "MoreInfo Page",
  });
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("product_id");
  const userId = urlParams.get("userId");
  const version = urlParams.get("isV");
  const product = data.filter((product) => product.id == product_id)[0];
  const [openFeaturesUV, setOpenFeaturesUV] = useState(false);
  const [openFeaturesPOL, setOpenFeaturesPOL] = useState(false);
  const [openFeaturesZU, setOpenFeaturesZU] = useState(false);
  const [openFeaturesSEH, setOpenFeaturesSEH] = useState(false);
  const [pageStartTime, setPageStartTime] = useState(0);
  const [initalTimeSpent, setInitalTimeSpent] = useState(0);

  const handleJetztKaufenClick = (data) => {
    console.log("check cart button");
    const ref = doc(db, "users", userId);
    try {
      setDoc(
        ref,
        { "Clicked Jetzt Kaufen": arrayUnion(data) },
        { merge: true }
      );
    } catch (err) {
      console.log("error cart button");

    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setInitalTimeSpent(
      parseInt(sessionStorage.getItem("timeSpentOnProductDetailsPage_" + product.product_name)) || 0
    );
    setPageStartTime(Date.now());
  }, []);

  useEffect(() => {
    return () => {
      const pageEndTime = Date.now();
      const timeSpentInSeconds = (pageEndTime - pageStartTime) / 1000;
      sessionStorage.setItem(
        "timeSpentOnProductDetailsPage_" + product.product_name,
        initalTimeSpent + timeSpentInSeconds
      );
    };
  }, [pageStartTime]);

  const handleClick = (feature) => {
    const ref = doc(db, "users", userId);
    let data = {
      "Clicked Feature": arrayUnion(feature + " " + new Date()),
    };
    try {
      setDoc(ref, data, { merge: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="secondHeader">
        <SecondHeader
          userId={userId}
          onClickJetztKaufen={handleJetztKaufenClick}
          product_id={product_id}
          version={version}
          timeData={false}
        />
      </div>
      <div id="top" className="moreinfopage">
        <hr />
        <h1>Product Details </h1>
        <hr />
        <h2>
          {product.uv_tag}: not present{" "}
          {openFeaturesUV ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesUV(!openFeaturesUV);
                handleClick("UV-Filter");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesUV(!openFeaturesUV);
                handleClick("UV-Filter");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesUV ? "block" : "none" }}>
          The {product.product_name} does not have a built-in UV protection
          filter.
        </p>
        <hr />

        <h2>
          {product.Polarisierung_tag}: not present{" "}
          {openFeaturesPOL ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesPOL(!openFeaturesPOL);
                handleClick("Polarisierung");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesPOL(!openFeaturesPOL);
                handleClick("Polarisierung");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesPOL ? "block" : "none" }}>
          Polarized sunglasses not only offer protection from harmful UV
          radiation, they also reduce unpleasant reflections from sunlight. The{" "}
          {product.product_name} is not polarized in this version.
        </p>
        <hr />
        <h2>
          {product.Material}: plastic{" "}
          {openFeaturesZU ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesZU(!openFeaturesZU);
                handleClick("Material");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesZU(!openFeaturesZU);
                handleClick("Material");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesZU ? "block" : "none" }}>
          The frame of the {product.product_name} is made of standard plastic.
        </p>
        <hr />
        <h2>
          {product.Lenses}: standard{" "}
          {openFeaturesSEH ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesSEH(!openFeaturesSEH);
                handleClick("Sehstärke");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesSEH(!openFeaturesSEH);
                handleClick("Sehstärke");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesSEH ? "block" : "none" }}>
          The {product.product_name} is equipped with standard lenses. We do
          not guarantee durability or protection against scratches. Prescription
          adjustment is not possible.
        </p>
        <hr />
      </div>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default MoreinfoNegative;