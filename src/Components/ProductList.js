import React, { useState, useEffect } from "react";
import product_card from "../data/product_data";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";

// Function to shuffle the array
const shuffleArray = (array) => {
  const sessionKey = 'shuffledIDs';
  let storedOrder = sessionStorage.getItem(sessionKey);

  if (storedOrder) {
    // If a list is already present, sort the array in the order stored
    const order = JSON.parse(storedOrder);
    return array.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  } else {
    // If no list is present, shuffle the array and store the order
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const ids = array.map(item => item.id);
    sessionStorage.setItem(sessionKey, JSON.stringify(ids));
    return array;
  }
};


const ProductList = ({ ref, userId }) => {
  // Shuffle the product list
  const shuffledProducts = shuffleArray([...product_card]);

  const listItems = shuffledProducts.map((item, index) => (
    <Cell userId={userId} shoe={item} image={item.thumb} key={index} />
  ));

  return (
    <div id="productList" className="productlistHead" ref={ref}>
      <h4 className="productlistHeadh4"> Choose Your New Favorite Sunglasses </h4>
      <div className="productlist">{listItems}</div>
    </div>
  );
};

function Cell({ shoe, image, userId }) {
  const [hover, setHover] = useState(false);
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setMode(searchParams.get("mode"));
  }, []);

  const handleClick = async () => {
    const ref = doc(db, "users", userId); // Firebase creates this automatically
    let data = {
      "Clicked Shop Now": arrayUnion(
        shoe.product_name + " " + new Date()
      ),
    };
    try {
      await setDoc(ref, data, { merge: true });
      navigate(`/product?mode=${mode}&product_id=${shoe.id}&userId=${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={shoe.thumb} alt="Placeholder image"></img>
        </figure>
      </div>
      <div className="card-content">
        <p className="title-product-title">{shoe.product_name}</p>

        <div className="content">
          {shoe.price}
          <br></br>
        </div>
        <button onClick={handleClick} className="button is-primary">
          <strong>Shop now</strong>
        </button>
      </div>
    </div>
  );
}

export default ProductList;
