import React from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import AnonymousMenu from "./Menus/AnonymousMenu";
import UserMenu from "./Menus/UserMenu";

const Toolbar = ({user, logout}) => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={RouterNavLink} to="/">My Music</NavbarBrand>

      <Nav className="ml-auto" navbar>
        {user ? <UserMenu user={user} logout={logout}/> : <AnonymousMenu/>}
      </Nav>
    </Navbar>
  );
};

export default Toolbar;