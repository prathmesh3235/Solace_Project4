import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

function Slider({ product }) {
  return (
    <Carousel interval={2000} className="carousel">
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={product.thumb2}
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={product.thumb}
          alt="Second slide"
        />
        <Carousel.Caption>
          {/* <h3>Second slide label</h3> */}
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={product.thumb3}
          alt="Third slide"
        />
        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={product.thumb4}
          alt="Fourth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
