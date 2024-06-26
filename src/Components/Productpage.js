import React, { useEffect } from "react";
import Slider from "./Slider";
import ReactGA from "react-ga4";
import Footer from "./Footer";

const Productpage = ({ product, userId }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const product_id = urlParams.get("product_id");
    ReactGA.event({
      action: userId,
      category: "clicked product " + product_id,
      value: parseInt(product_id),
    });
  });

  return (
    <div>
      <div className="product-page-three">
        {/* <h1> {product.product_name} </h1> */}
        <div className="threeprod">
          {[1, 2, 3, 4].map((i) => {
            if (i === 1) {
              return <img key={i} src={product.thumb} />;
            } else if (i === 2) {
              return <img key={i} src={product.thumb2} />;
            } else if (i === 3) {
              return <img key={i} src={product.thumb3} />;
            } else {
              return <img key={i} src={product.thumb4} />;
            }
          })}
        </div>
        <Slider product={product} />
      </div>
    </div>
  );
};

export default Productpage;
