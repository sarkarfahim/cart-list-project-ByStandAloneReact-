
import {Container, Nav, Navbar} from "react-bootstrap";

import {Link, NavLink} from "react-router-dom";

import validation from "../utilites/validationHelper.js";
import logo from "../assets/img/Shopify-Logo.png"
const Navber = () => {
    const logout = ()=>{
        sessionStorage.removeItem("token");
        window.location.href="/";
    }
  return (
      <Navbar expand="lg" className="bg-body-tertiary bg-white shadow-lg">
        <Container fluid>
            <Navbar.Brand href="#">
                <img alt="" className="nav-logo" src={logo}/>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink className="nav-link" to="/">Home</NavLink>

              {
                  validation.isLogin() &&
                  <NavLink className="nav-link" to="/cart-list">Cart List</NavLink>
              }
            </Nav>

            {
              validation.isLogin()?(
                  <button onClick={logout} className="btn btn-danger">Logout</button>
              ): (<Link className="btn btn-danger" to="/login">Login</Link>)
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default Navber;