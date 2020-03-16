import React, {Fragment} from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

const Toolbar = ({user, logout}) => {
    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RouterNavLink} to="/">My Music</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {user ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, {user.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink tag={RouterNavLink} to='/track-history' style={{color:'black'}} >
                                            Track History
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem onClick={logout}>
                                        <NavLink style={{color:'black'}}>
                                            Logout
                                        </NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            <Fragment>
                                <NavItem>
                                    <NavLink tag={RouterNavLink} to="/register" exact>Sign Up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RouterNavLink} to="/login" exact>Log In</NavLink>
                                </NavItem>
                            </Fragment>
                        )}
                    </Nav>
            </Navbar>
        </div>
    );
};

export default Toolbar;