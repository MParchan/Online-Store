import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartContext from "../../store/cart-context";

function MainNavigation() {
  const cartCtx = useContext(CartContext);
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Online store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="p-3" to="/">
              Products List
            </Link>
            <Link className="p-3" to="/log-in">
              Log in
            </Link>
            <Link className="p-3" to="/sign-up">
              Sign up
            </Link>
            <Link className="p-3" to="/cart">
              Cart
              <span>{cartCtx.totalItems}</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
