import React, { useContext, useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

const CustomNavbar = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false
      });
      navigate("/");
    });
  };

  const toggle = () => setIsOpen(!isOpen);

  const linkStyle = {
    color: 'white', // Set text color
    textDecoration: 'none', // Remove underline
    padding: '0.5rem 1rem', // Add padding for better touch target
    cursor: 'pointer', // Change cursor on hover
    transition: 'color 0.3s ease', // Smooth color transition
    display: 'inline-block' // Ensure it behaves like a block-level element
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" className="px-5">
        <NavbarBrand tag={ReactLink} to="/">
          MyNotes
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                Recent Notes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/contact">
                  Contact Us
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <a href="https://www.linkedin.com/in/vibhayadav04/" style={{ textDecoration: 'none', color: 'inherit' }}>LinkedIn</a>

                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                    Profile Info
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Sign Up
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
