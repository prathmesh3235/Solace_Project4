import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";

function Cell({ shoe, image, userId }) {
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setMode(searchParams.get("mode"));
  }, []);

  const handleClick = async () => {
    const productIdSequence = JSON.parse(sessionStorage.getItem("shuffledIDs"));
    const shuffledIndex = productIdSequence.indexOf(shoe.id);
  
    // Retrieve or initialize the product details version array
    let productDetailsVersion = JSON.parse(sessionStorage.getItem("productdetailsVersion")) || [];
    let lastValue = sessionStorage.getItem("lastValue");
    
    // Determine if this is the first interaction and handle boolean conversion properly
    lastValue = lastValue === null ? Math.random() < 0.5 : lastValue === 'true';

    if (typeof productDetailsVersion[shuffledIndex] !== 'boolean') {
      lastValue = !lastValue;
      productDetailsVersion[shuffledIndex] = lastValue;
      sessionStorage.setItem("productdetailsVersion", JSON.stringify(productDetailsVersion));
      sessionStorage.setItem("lastValue", lastValue.toString());
    }

    const ref = doc(db, "users", userId);
    let data = {
      "Clicked Shop Now": arrayUnion(shoe.product_name + " " + new Date()),
    };

    try {
      await setDoc(ref, data, { merge: true });
      navigate(`/product?mode=${mode}&product_id=${shoe.id}&userId=${userId}`);
    } catch (err) {
      console.error("Error during navigation or data update:", err);
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={`${shoe.product_name}`} />
        </figure>
      </div>
      <div className="card-content">
        <p className="title-product-title">{shoe.product_name}</p>
        <div className="content">
          {shoe.price}
          <br />
        </div>
        <button onClick={handleClick} className="button is-primary">
          <strong>Shop now</strong>
        </button>
      </div>
    </div>
  );
}

export default Cell;