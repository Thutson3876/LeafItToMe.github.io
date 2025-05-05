import { Row, Col, Nav, Navbar, Container } from "react-bootstrap";
import {
   Link
 } from 'react-router-dom';

/*
      <Row>
         <Col>
            <h1>LeafItToMe</h1>
         </Col>
         <Col></Col>
         <Col className="float-end">
            <Row>
               <Col><Link to="/login">LOGIN</Link></Col>
               <Col><Link to="/register">REGISTER</Link></Col>
               <Col><Link to="/teas">All TEAS</Link></Col>
               <Col><Link to="/my-teas">MY TEAS</Link></Col>
            </Row>
         </Col>
      </Row>
*/

function Header() {
   return (
      <>
         <Navbar>
            <Container>
               <Navbar.Brand href="/" >LeafItToMe</Navbar.Brand>
               <Nav className="float-end">
                  <Nav.Link href="/teas">All Teas</Nav.Link>
                  <Nav.Link href="/my-teas">My Teas</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
               </Nav>
            </Container>
         </Navbar>
         <hr className="align-self-stretch"/>
    </>
   );
}

export default Header;