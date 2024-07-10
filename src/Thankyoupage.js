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
    let totalTimeSpentOnSingleProductPage = 0;
    let totalTimeSpentOnProductDetailsPage = 0;
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("timeSpentOnSingleProductPage")) {
        totalTimeSpentOnSingleProductPage += parseFloat(sessionStorage.getItem(key)) || 0;
      }
      if (key.startsWith("timeSpentOnProductDetailsPage")) {
        totalTimeSpentOnProductDetailsPage += parseFloat(sessionStorage.getItem(key)) || 0;
      }
      timeSpentData[key] = sessionStorage.getItem(key);
    });
    timeSpentData.totalTimeSpentOnSingleProductPage = totalTimeSpentOnSingleProductPage;
    timeSpentData.totalTimeSpentOnProductDetailsPage = totalTimeSpentOnProductDetailsPage;

    try {
      setDoc(ref, timeSpentData, { merge: true });
    } catch (err) {
      console.log("error cart button");
      console.log(err);
    } finally {
      sessionStorage.clear();
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
          Please close this website now and return to the survey to finish it.
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyoupage;
