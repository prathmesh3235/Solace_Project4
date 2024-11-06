import React, { useEffect } from "react";
import Footer from "./Components/Footer";
import styled from "styled-components";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./services/firebase";

const Thankyoupage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const mode = urlParams.get("mode");
  const version = urlParams.get("isV");

  useEffect(() => {
    console.log("Version: " + version);
    const ref = doc(db, "users", userId);
    let timeSpentData = {};
    let totalTimeSpentOnSingleProductPage = 0;
    let totalTimeSpentOnProductDetailsPage = 0;
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("timeSpentOnSingleProductPage")) {
        totalTimeSpentOnSingleProductPage +=
          parseFloat(sessionStorage.getItem(key)) || 0;
      }
      if (key.startsWith("timeSpentOnProductDetailsPage")) {
        totalTimeSpentOnProductDetailsPage +=
          parseFloat(sessionStorage.getItem(key)) || 0;
      }
      timeSpentData[key] = sessionStorage.getItem(key);
    });

    timeSpentData.totalTimeSpentOnSingleProductPage =
      totalTimeSpentOnSingleProductPage;

    if (totalTimeSpentOnProductDetailsPage > 0) {
      timeSpentData.totalTimeSpentOnProductDetailsPage =
        totalTimeSpentOnProductDetailsPage;
    }

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
        <h1>.</h1>
      </div>
      <div className="thankyoutext">
        <h2 className="tyh2">Thank You.</h2>
        <br />
        <div>
          {version === "true" && mode === "1" ? (
            <h3 className="tyh4">
              Now,
              <a href="https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_9u8rWhIK6RpqMBw">
                {" "}
                please follow this link to return to the survey.
              </a>
            </h3>
          ) : version === "false" && mode === "1" ? (
            <h3 className="tyh4">
              Now,
              <a href="https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_4O3W8IDNGCx8WmG">
                {" "}
                please follow this link to return to the survey.
              </a>
            </h3>
          ) : version === "true" && (mode === "2" || mode === "3") ? (
            <h3 className="tyh4">
              Now,
              <a href="https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_6zYE8efPUT2Wo4K">
                {" "}
                please follow this link to return to the survey.
              </a>
            </h3>
          ) : version === "false" && (mode === "2" || mode === "3") ? (
            <h3 className="tyh4">
              Now,
              <a href="https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_aUZMfDVxRznFbYW">
                {" "}
                please follow this link to return to the survey.
              </a>
            </h3>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyoupage;
