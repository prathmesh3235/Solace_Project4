import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  // margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  
}
.rh5v-DefaultPlayer_controls{
  display: none;
}
h3 {
  font-size: 25px;
  font-weight:bold;
}
video{
  height:500px;
  width:800px;
}

.product-info-i{
  font: 1.2em "Fira Sans", sans-serif;
  margin-top:10px;
  font-weight: bold;
  font-size: 42px;
  

  button{
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-left:20px;
  margin-top:10px;
  text-align: center;
  font-size: 20px;
  background-color: white;
  font-weight: bold;
  color: black;
  }
}

.thirdHeader{
  background-color: #fce698;
  width: 100%;
  height: 80px
}

.thirdHeader h1{
  color: #fce698;
}

.thankyoutext{
  margin-bottom: 20rem;
}
.tyh4{
  font-size: 30px;
  text-align: center;
}
.product-info-i{
  font-size:50px;
  font-weight:bold;
}  
.carousel {
  display: none !important;
}
.threeprod {
  display: block !important;
}
@media screen and (max-width: 425px) {
  .carousel {
    display: block !important;
  }
  .threeprod {
    display: none !important;
  }
}
@media screen and (max-width: 1024px) {

  
  .product-info-i button{
   font-size: 13px;
  }
  h3{
    font-size: 15px;
    font-weight: bold;
  }
  Video{
    width: -webkit-fill-available !important; 
    margin-top: 10px;
    height: auto !important;
  }
  .virtual-text {
      display: none !important;
  }
  .virtual-container {
      display: flex;
      padding: 1px;
      border: 0 solid !important;
      border-width:0;
      border-color: #364F6B;
      border-radius:0;
      margin-left:100px;
      margin-right:100px;
      margin-top:50px;
      margin-bottom:50px;
      padding:5px;
  }
  .single-product-page {
    flex-direction: column;
    height: auto !important;
  }
  .productlistHead {
    margin-right: auto !important;
  }
  .productlistHeadh4 {
      font-size: 15px !important;
      color: red;  
    }
    
  
  .prodDispSec {
    margin-right: auto !important;
    margin-top: 20px; !important;
  }
  .display-info{
    margin-top: -40px;
  } 
  
  nav {
    display: none !important;
  }
  header {
    justify-content: center !important;
  }


  }  
  

}


html {
  font-size: 62.5%;
  /* scroll-behavior: smooth; */
  /* 1rem = 10px */s
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
  scrollbar-color: rgb(98 84 243);
  scrollbar-width: thin;
  width:100%;
  height:100%;
  position:relative;
  font-family: $round;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    }

    .price{
      color: black;
    }    
    
    }
    .btn-prod{
      background-color:black;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 10px;
    }    
    .single-product-page{
      display:flex;
      // margin:60px;
      // width: 100%;
      // height: 500px;
      justify-content: space-around;
     

      // .product-image{
      //   padding:50px;
      //   padding-right: 50px;
      //   img{
      //     height:200px;
      //     width:300px;
      //   }
        
        
      }
    }    

.w-100 {
  // height: auto !important;
  height: 720px;
  width: 400px;
}   
.slider-block {
  //background-color: black;
  // width: 60%;

}

.label-text{
  font-size: 3em;
  font-weight: bold;
  
}

.login-form{
  margin:50px;
  // display: inline-block;
  text-align: center;
 
  
}
.form-control{
  display: inline-block;
  height:30px;
}
.snip{
  height: 100%;
  width: 100%;
}
.productlist{
  
  
    background-color: var(--main-top-background-color);
    margin:30px;
    padding: 30px;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
    border-radius: .15rem;
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: 1.5fr 1.5fr 1.5fr 1.5fr;
    gap: 20px;
    font-family: 'Inconsolata', monospace;
    font-size: 3em;
    color: #364F6B;
    justify-content: space-around;
    h4{
      position:absolute;
      color:$text;
      font-size:2.5vw;
      // margin:-30px 200px;
      text-align:left;
      background-color: #FCE698;
      
      
      // -webkit-box-sizing: border-box;
      //         box-sizing: border-box;
      // -webkit-box-pack: justify;
      //     -ms-flex-pack: justify;
      //         justify-content: space-between;
      // -ms-flex-wrap: wrap;
      //     flex-wrap: wrap;   
    }
    .button.is-primary {
      background-color:  #364F6B;
      padding-right:10px;
      padding-left:10px;
      margin-bottom:10px;
      border: none;
      color: white;
     //padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 20px;
      // margin:-28px;
  }

  
  
  .button.is-primary:hover {
      background-color: #FCE698;
      color: #364F6B;
      padding:3px;
      border: none;
      padding-right: 10px;
      padding-left: 10px;
     //padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin:-7px;
      border: 2px;

  }

 
 
  
  .content {
    margin-bottom: 10px;
  }
  
  .title {
      color: var(--main-accent-color);
      font-family: 'Inconsolata', monospace;
      font-size: 3em;
  }
  
  #inner-large-banner {
      height: 40%;
      width: 100%;
      background-image: url('img/forest.jpg');
      background-size: cover;
      background-position: 50% 25%;
  }
  
  #wrapper {
      width: 80%;
      min-height: 70%;
      /* margin-top: -100px; */
      background-color: var(--main-top-background-color);
      margin: -100px auto 0 auto;
      padding: 30px;
      box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
      border-radius: .25rem;
  }

  
  #product-catalog {

      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 20px;
      margin-top:500px;
  }
  
  :root {
    --main-background-color: red;
    --main-top-background-color: red;
    --main-accent-color: red;
    --title-color: red;
}
  .product-title {
      font-size: 1em;
  }
    
}
    
 }
 
body::-webkit-scrollbar {
  width: 1.5rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}

h1,
h2,
h3,
h4 {
  //  font-family: "Work Sans", sans-serif;
   

}

h1 {
  color: #364F6B;
  
  font-size: 5rem;
  font-weight: 900;
}

 h2 {
   color:  #364F6B;
   font-size: 4.4rem;
   font-weight: 600;
   white-space: normal;
  
  }



p, button {
  color: #364F6B;
  font-size: 1.65rem;
  line-height: 1.5;
  font-weight:400;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}


${"" /* resuable code section  */}

.container {
  max-width: 120rem;
  margin-top: 80px;
}

.grid {
  display: grid;
  gap: 9rem;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}

.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}

.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}

.grid-five-column{
  grid-template-columns: repeat(5, 1fr);
}

  .common-heading {
      font-size: 3.8rem;
      font-weight: 600;
      margin-bottom: 6rem;
      text-transform: capitalize;
    }

     .intro-data {
      margin-bottom: 0;
      text-transform: uppercase;
      color: #364F6B;
    }

   .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }

input, textarea{
    max-width: 50rem;
    color: ${({ theme }) => theme.colors.black};
    padding: 1.6rem 2.4rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: uppercase;
   box-shadow: ${({ theme }) => theme.colors.shadowSupport};
}
    input[type="submit"]{
    max-width: 16rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: .1rem;
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;
    }
  .uppersection{
    text-align: center;
    margin-top:14rem;
    margin:auto;
    // width:825px;
  }  
  .product-page-three{

    text-align: center;
  }
  .threeprod{
    img{
      border-style: outset;
      margin-right:10px;
      margin-top:10px;
      height: 150px;
      width: 210px;
      background-size: 100%;
    }
  }
  .uppersection{
    text-align: center;
    margin:auto;
    margin-top:14rem
    
  }  
  .product-page-three{
    // margin-top: 80px;
    text-align: center;
  }
  .threeprod{
    img{
      border-style: outset;
      margin-right:15px;
      margin-top:10px;
      height: 200px;
      width: 300px;
      background-size: 100%;
    }
  }

@media (max-width: ${({ theme }) => theme.media.tab}) {
  .iFrame{
    width: auto !important;
   }
    .container {
    max-width: 130rem;
    padding: 0 3.2rem;
  }
  }

   @media (max-width: ${({ theme }) => theme.media.mobile}) {
       html {
      font-size: 50%;
    }
    .container {
      margin-top: 20px !important;
    }
    .hero-section-image {
      margin-right: 0 !important;
    }
    .carousel {
      height: auto !important;
    }
    iframe{
    width: auto !important;
   }

.grid{
  gap: 3.2rem;
}
      .grid-two-column , .grid-three-column, .grid-four-column{
          grid-template-columns: 1fr;
        }
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    .card {
      // background-color: #F8F6F4;
      border: 3px;
      border-style: groove;
      border-color: rgb(252, 230, 152);;
    
      height: 270px;
      width: 270px;
      font-size: 15px;
      text-decoration-color: aliceblue;
      // margin-right: 5rem;
      padding: 10px;
      
      margin-top: 80px;
      overflow-wrap: normal;
    
    }
    
    .card: hover{
      transform: scale(1.1);
      transition: transform .4s ease;

    }
    .card-content{
      text-align: center;
      font-family: Tahoma;
      font-size:15px;
      margin-bottom:-10px;
      //font-family: bold;
  

      .title-product-title{
        font-size: 22px;
        font-weight: bold;
        
      }

     .content{
      font-size:20px;
      font-weight: bold;
      
     } 
      
    }
.product-page{
  h1{
    text-align: center;
  
  }
}


  
    img{
      height: 100px;
      width: 160px;
      background-size: 100%;
    }
    .virtual-container{
      justify-content: center;
      display: flex;
      padding: 1px;
      // border: 1px solid;
      // border-style: groove;
      // border-width:5px;
      // border-color: #364F6B;
      // border-radius:20px;
      margin-left:100px;
      margin-right:100px;
      margin-top:50px;
      margin-bottom:50px;
      padding:5px;
      

      .virtual-text{
        align-items: center;
        width:80%;
        // margin:20px;
      }

    .vertical-center{
      padding:10px;
    }  
    }
    h4{
      position:absolute;
      color:$text;
      font-size:2.5vw;
      font-weight:bold;
      // margin-left: 350px;
      // margin-top: 20px;
      // margin-bottom: 20px;
      
      
      text-align:center;
      // background-color: #FCE698;
      
      
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;   
    }
  
    .productlistHead {
      text-align:center;
      display: flex;
      justify-content: center;
      h4 {
        font-size:2.5vw;
        margin-top: 50px;
      }
    }

    .secondHeader{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100; 
    }
    .moreinfopage{
      margin-top: 5rem;
      padding-right:1rem;
      padding-left:1rem;
      text-align: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      h1{
        margin-top: 9rem;
      }
      p{
        color: black;
        text-align: center;
        font-size:20px;
        font-weight:semi-bold;
        margin-right: 10px;
        margin-left: 10px;
        width: 80%;
      }
    }
    .thankyou{
      text-align: center;
      font-size:55px;
      margin:50px;
    }
    .tyh2{
      height:auto;
      margin:20px;
      margin-top:14rem;
      font-size:95px;
      text-align: center;
    }

    .tyh3{
      height:auto;
      margin:20px;
      text-align: center;
      font-size:25px;
    }
    .navbar-link-cart{
      margin-right:30px;
      color: #364F6B;
    }
    d-block w-100{
      background-color:red;
    }

    .carousel {
      height: 40rem;
      overflow:hidden;
    }
     .iFrame{
      width: 560px;
     }
     .ytvideo {
      text-align: center;
      margin-top: 20px;
      margin-bottom: -50px;
     }
     .carousel-image {
      margin-top: 40px;
        height: 100%;
        width: 100%;
     }
     .productlistHeadh4 {
      font-size: 25px !important;
      color: rgb(54, 79, 107);  
      
    }
    @media (min-width:1023px){
      .productlistHeadh4 {
      font-size: 30px !important;
      color: rgb(54, 79, 107);
    }
    @media (max-width: 1024px) {
    .product-page-three h1{
      margin-top:-6rem;
    }
  }
`;
