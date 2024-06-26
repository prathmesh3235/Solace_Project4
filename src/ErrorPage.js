
import styled from 'styled-components'
import { Button } from './styles/Button'
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return ( 
  <Wrapper>
    <div className="container">
      <div>
        <h2> 404 ERROR</h2>
        <h3> You are Lost</h3>
        <p>
          The Page you are looking for does not exist.
          Click the button below to go back to Home Page. 
        </p>
        <NavLink to={"/"}> 
        <Button>
            Go Back to Home
          </Button>
          </NavLink>
        </div>    </div>
     </Wrapper>
  );


};

const Wrapper = styled.section`
.container{
  padding: 9rem;
  text-align: center;
}

h2{
  font-size:8rem;

}

h3{
  font-size:4.2rem;

}
p{
  margin-2 rem 0;
}

`;
export default ErrorPage;
