import React, { useEffect, useState } from "react";
import HeroSection from "./Components/LandingPage";
import ProductList from "./Components/ProductList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "./services/firebase";

const Home = ({ ref }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const [pageStartTime, setPageStartTime] = useState(0);
  const [initalTimeSpent, setInitalTimeSpent] = useState(0);

  const data = {
    name: "Sunny",
    description: "This is a description for the home page",
  };
  const handleClick = (feature) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setInitalTimeSpent(
      parseInt(sessionStorage.getItem("timeSpentOnHomePage")) || 0
    );
    setPageStartTime(Date.now());
  }, []);

  useEffect(() => {
    return () => {
      // Calculate the time spent on the page
      const pageEndTime = Date.now();
      const timeSpentInSeconds = (pageEndTime - pageStartTime) / 1000; // Calculate time spent in seconds
      sessionStorage.setItem(
        "timeSpentOnHomePage",
        initalTimeSpent + timeSpentInSeconds
      );
    };
  }, [pageStartTime]);

  return (
    <>
      <Header />
      <HeroSection userId={userId} myData={data} />
      <div className="pcontainer">
        <ProductList userId={userId} ref={ref} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
