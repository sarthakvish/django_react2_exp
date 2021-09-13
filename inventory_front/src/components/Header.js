import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Container, Nav, Navbar, Row, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";


function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    const navbar = {backgroundColor: '#8a2b06'};
    return (
        <header>
                <Navbar style={navbar} collapseOnSelect>
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand >Do ऑनलाइन बिजनेस  </Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <SearchBox/>
                            <Nav className="ml-auto">
                                <LinkContainer to='/cart'>
                                    <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/stocklist'>
                                            <NavDropdown.Item>Product</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>


                                    </NavDropdown>
                                )}



                            </Nav>

                        </Navbar.Collapse>
                    </Container>

                </Navbar>
        </header>
    );
}

export default Header;