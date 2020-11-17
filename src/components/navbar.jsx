import React from "react";
import { Navbar, Container } from "bootstrap";

function navbar() {
  return (
    <Container>
      <Navbar sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Strive-BookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#welcome'>Welcome</Nav.Link>
            <Nav.Link href='#welcome'>Latest Releases</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default navbar;
