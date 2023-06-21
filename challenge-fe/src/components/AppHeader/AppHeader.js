import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppHeader() {

    return (
        <Navbar bg="light" expands="lg">
            <Container>
                <Navbar.Brand>
                    Calculator Challenge
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />


                <Nav className="me-auto" activeKey={1}>
               
                    <Nav.Link eventKey={1} href="/calculator">
                        Calculator
                    </Nav.Link>
                    <Nav.Link eventKey={2} href="/myRecords">
                        Records
                    </Nav.Link> 
                
                </Nav>

                <Nav pullRight>
                    <Nav.Link eventKey={3}  href="/logout" >
                        Log out
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
