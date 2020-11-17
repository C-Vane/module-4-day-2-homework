import React from "react";
import {Navbar, Nav} from "react-bootstrap";

function navbar() {
  return (
      <Navbar sticky='top'  expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='#'>Strive-BookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#'>Home</Nav.Link>
            <Nav.Link href='#'>About</Nav.Link>
            <Nav.Link href='#'>Browse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

  );
}

export default navbar;
