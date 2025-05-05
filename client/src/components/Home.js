import { Col, Row, Button } from "react-bootstrap";

function Home() {
   return (
      <>
        <h3 class="emphasis">
            Can't think of what tea you want? <br />
            We'll help you decide!
        </h3>

        <hr />

        <img className="cover" src={require("../teaGreen.jpg")} alt="Tea Background"></img>
         <br></br>
         <br></br>
        <Row>
         <Col>
            <p className="text-center">
               Drinking tea is an experience; an experience that allows one to take
               a break, wait as the flavors and aromas steep, and finally enjoy a nice long
               sip from a lovely cup.
            </p>
             
            <p className="text-center">
               There's a tea for every occasion, whether you need a boost
               of energy in the morning, or something to help you relax, there's always a blend
               that ready to improve your day.
            </p>
            
         </Col>
        </Row>

        <hr />

        <Row className="align-content-center">
            <Col className="align-items-center">
               <h2 className="text-center">Browse the community's collection.</h2>
               <br></br>
               <Button href="/teas" className="centered">Browse Collection</Button>
               <br></br>
               <hr />
               <br></br>
               <h2 className="text-center">Find the right tea for you!</h2>
               <br></br>
               <Button href="/suggestion" className="centered">Suggestion</Button>
               <br></br>
               <br></br>

            </Col>
        </Row>

        
      </>
   );
}

export default Home;