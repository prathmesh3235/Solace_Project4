import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import SecondHeader from "./Components/SecondHeader";
import Footer from "./Components/Footer";
import styled from "styled-components";
import data from "./data/product_data";
import { AiOutlinePlus } from "react-icons/ai";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "./services/firebase";

const MoreinfoPositive = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.href,
    title: "MoreInfo Page",
  });
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("product_id");
  const userId = urlParams.get("userId");
  const product = data.filter((product) => product.id == product_id)[0];

  // const [openFeatures, setOpenFeatures] = useState("")
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
      console.log(err);
    }
  };
  // Record the time when the component mounts as page start time

  useEffect(() => {
    window.scrollTo(0, 0);
    setInitalTimeSpent(
      parseInt(sessionStorage.getItem("timeSpentOnProductDetailsPage")) || 0
    );
    setPageStartTime(Date.now());
  }, []);
  useEffect(() => {
    return () => {
      // Calculate the time spent on the page
      const pageEndTime = Date.now();
      const timeSpentInSeconds = (pageEndTime - pageStartTime) / 1000; // Calculate time spent in seconds
      sessionStorage.setItem(
        "timeSpentOnProductDetailsPage",
        initalTimeSpent + timeSpentInSeconds
      );
    };
  }, [pageStartTime]);

  const handleClick = (feature) => {
    console.log("handleClick", feature, userId);

    const ref = doc(db, "users", userId); // Firebase creates this automatically
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
        />
      </div>
      <div id="top" className="moreinfopage">
        <hr />
        <h1>Produktdetails Positive </h1>
        <hr />
        <h2>
          {product.uv_tag}
          <AiOutlinePlus
            size={25}
            onClick={() => {
              setOpenFeaturesUV(!openFeaturesUV);
              handleClick("UV-Filter");
            }}
          />{" "}
        </h2>
        <p style={{ display: openFeaturesUV ? "block" : "none" }}>
          The {product.product_name} impresses with the built-in UV protection
          filter &quot;UV1000&quot; in &quot;very strong&quot;. This guarantees
          protection against solar radiation up to UV index 10+.
        </p>
        <hr />

        <h2>
          {product.Polarisierung_tag}
          <AiOutlinePlus
            size={25}
            onClick={() => {
              setOpenFeaturesPOL(!openFeaturesPOL);
              handleClick("Polarisierung");
            }}
          />{" "}
        </h2>
        <p style={{ display: openFeaturesPOL ? "block" : "none" }}>
          Polarized sunglasses not only offer protection from harmful UV
          radiation, they also reduce unpleasant reflections from sunlight. The{" "}
          {product.product_name} is polarized in this version.
        </p>
        <hr />
        <h2>
          {product.Material}
          <AiOutlinePlus
            size={25}
            onClick={() => {
              setOpenFeaturesZU(!openFeaturesZU);
              handleClick("Material");
            }}
          />{" "}
        </h2>
        <p style={{ display: openFeaturesZU ? "block" : "none" }}>
          The frame of the {product.product_name} is made of high-quality metal,
          which guarantees durability and robustness.
        </p>
        <hr />
        <h2>
          {product.Lenses}
          <AiOutlinePlus
            size={25}
            onClick={() => {
              setOpenFeaturesSEH(!openFeaturesSEH);
              handleClick("Sehstärke");
            }}
          />
        </h2>
        <p style={{ display: openFeaturesSEH ? "block" : "none" }}>
          The {product.product_name} is equipped with high-quality, hard-wearing
          lenses. We guarantee durability and a high level of protection against
          scratches. If required, the lenses can be adjusted for prescription at
          no extra cost.
        </p>
        <hr />
      </div>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default MoreinfoPositive;
