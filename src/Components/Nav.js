import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from "react-icons/cg"; 
import ReactGA from 'react-ga4';
import {BsCartCheckFill} from 'react-icons/bs'


const Nav = () => {
const [menuIcons, setMenuIcon] = useState();

const Nav = styled.nav`
.navbar-lists {
  display: flex;
  gap: 4.8rem;
  align-items: center;
  .navbar-link {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: 1.8rem;
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.black};
      transition: color 0.3s linear;
      padding: 10px;
    }
    &:hover,
    &:active {
      color: ${({ theme }) => theme.colors.helper};
    }
  }
}
.mobile-navbar-btn {
  display: none;
  background-color: transparent;
  cursor: pointer;
  border: none;
}
.mobile-nav-icon[name="close-outline"] {
  display: none;
}
.close-outline {
  display: none;
}
  

}
@media (max-width: ${({ theme }) => theme.media.mobile}) {
  .mobile-navbar-btn {
    display: none !important;
    z-index: 9999;
    border: ${({ theme }) => theme.colors.black};
    .mobile-nav-icon {
      font-size: 4.2rem;
      color: ${({ theme }) => theme.colors.black};
    }
  }
  .active .mobile-nav-icon {
    display: none;
    font-size: 4.2rem;
    position: absolute;
    top: 30%;
    right: 10%;
    color: ${({ theme }) => theme.colors.black};
    z-index: 9999;
  }
  .active .close-outline {
    display: none !important;
  }
  .navbar-lists {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
    /* transform-origin: top; */
    transition: all 3s linear;
  }
  .active .navbar-lists {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
    z-index: 9999;
    transform-origin: right;
    transition: all 3s linear;
    .navbar-link {
      font-size: 4.2rem;
    }
  }

  
  
}
`;

  const handleClick = () => {
  
    const element = document.getElementById('productList');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

return (
<Nav>
  <div className={menuIcons ? "navbar active" : "navbar"}>
    <ul className="navbar-lists">
      <li>
        <NavLink
          to="/home"
          className="navbar-link "
          onClick={() => setMenuIcon(false)}>
          Home
        </NavLink>
      </li>
      
      <li>
        <NavLink
          to="#products"
          className="navbar-link "
          onClick={handleClick}>
          Sunglasses
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to="/thankyou"
          className="navbar-link "
          onClick={() => setMenuIcon(false)}>
          <BsCartCheckFill/>
        </NavLink>
      </li> */}
      
    </ul>

    {/* two button for open and close of menu */}
    <div className="mobile-navbar-btn">
      <CgMenu
        name="menu-outline"
        className="mobile-nav-icon"
        onClick={() => setMenuIcon(true)}
      />
      <CgClose
        name="close-outline"
        className="mobile-nav-icon close-outline"
        onClick={() => setMenuIcon(false)}
      />
    </div>
  </div>
</Nav>
);
};

export default Nav;