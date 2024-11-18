import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";
import product_card from "../data/product_data";
import Cell from "./Cell";

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

const ProductList = ({ forwardedRef, userId }) => {
  const shuffledProducts = shuffleArray([...product_card]);

  const listItems = shuffledProducts.map((item, index) => (
    <Cell userId={userId} shoe={item} image={item.thumb} key={index} />
  ));

  return (
    <div id="productList" className="productlistHead" ref={forwardedRef}>
      <h4 className="productlistHeadh4">Choose Your New Favorite Sunglasses</h4>
      <div className="productlist">{listItems}</div>
    </div>
  );
};

export default ProductList;
