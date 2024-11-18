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
    const ref = doc(db, "users", userId);
    let data = {
      "Clicked Shop Now": arrayUnion(shoe.product_name + " " + new Date()),
    };

    try {
      await setDoc(ref, data, { merge: true });
      navigate(`/product?mode=${mode}&product_id=${shoe.id}&userId=${userId}`);
    } catch (err) {
      console.error("Error during navigation or data update:", err);
      // Optionally display an error message to the user
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
