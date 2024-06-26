import React, { useEffect } from "react";
import Footer from "./Components/Footer";
import styled from "styled-components";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./services/firebase";

const Thankyoupage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");

  useEffect(() => {
    const ref = doc(db, "users", userId);
    let timeSpentData = {};
    Object.keys(sessionStorage).forEach((key) => {
      timeSpentData[key] = sessionStorage.getItem(key);
    });
    try {
      setDoc(ref, timeSpentData, { merge: true });
    } catch (err) {
      console.log("error cart button");
      console.log(err);
    } finally {
      sessionStorage.removeItem("timeSpentOnHomePage");
      sessionStorage.removeItem("timeSpentOnSingleProductPage");
      sessionStorage.removeItem("timeSpentOnProductDetailsPage");
    }
  }, []);

  return (
    <div>
      <div className="thirdHeader">
        <h1> .</h1>
      </div>
      <div className="thankyoutext">
        <h2 className="tyh2"> Thank You. </h2>
        <br />{" "}
        <h3 className="tyh3">
          {" "}
          Now press the “Next arrow” at the bottom of the questionnaire and fill out the remaining questions
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyoupage;
