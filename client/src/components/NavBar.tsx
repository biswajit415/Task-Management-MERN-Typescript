import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <Navbar variant="dark" style={{backgroundColor:'#2d0357',marginBottom:'4%'}}>
    <Container>
      <Navbar.Brand >LOGO</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link   as={Link}  to='/' >Home</Nav.Link>
        <Nav.Link   as={Link}  to='/create' >Add New</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}
