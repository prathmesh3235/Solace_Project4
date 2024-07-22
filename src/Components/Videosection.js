import React from "react";
import styled from "styled-components";
import product_card from "../data/product_data";

const Videosection = ({ product, userId }) => {
  return (
    <div>
      {product_card.map((product, index) => [])}
      <div class="sketchfab-embed-wrapper">
        <iframe
          className="3diframe"
          width={"800"}
          height={"480"}
          title="Sun Glasses - Low Poly"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          // src="https://sketchfab.com/models/30ef0899dbf24ca7a831c11c542d1e36/embed?autospin=1&autostart=1"
          src={product.src}
        >
          {" "}
        </iframe>{" "}
      </div>
    </div>
  );
};

export default Videosection;
const Wrapper = styled.section`
  .sketchfab-embed-wrapper {
    margin-top: 2rem;
  }
`;
