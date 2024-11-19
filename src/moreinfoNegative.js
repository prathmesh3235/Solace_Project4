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
        <h1>Product Details</h1>
        <hr />
        <div className="feature-section">
          <h2>{product.uv_tag}: <span className="feature-detail">not present</span></h2>
        </div>
        <hr />
        <div className="feature-section">
          <h2>{product.Polarisierung_tag}: <span className="feature-detail">not present</span></h2>
        </div>
        <hr />
        <div className="feature-section">
          <h2>{product.Material}: <span className="feature-detail">plastic</span></h2>
        </div>
        <hr />
        <div className="feature-section">
          <h2>{product.Lenses}: <span className="feature-detail">standard</span></h2>
        </div>
        <hr />
      </div>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default MoreinfoNegative;

