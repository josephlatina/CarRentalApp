import { Link, Outlet } from "react-router-dom";
import { Button, Nav, Navbar, NavbarText, NavItem, NavLink } from "reactstrap";
import { useAuth } from "../provider/authContext";

export default function Root() {
    const { isSignedIn, user, logOut } = useAuth();

    return (
        <div className="root-style font-link">
            <Navbar color="">
                <Nav>
                    <NavItem>
                        <NavLink tag={Link} to="/home">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/car">
                            Car
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/rent" tag={Link}>
                            Rent
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/manager">
                            Manage Rentals
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/admin" tag={Link}>
                            Admin
                        </NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>
                    {isSignedIn ? (
                        <div>
                            <span
                                style={{ color: "white", marginRight: "1rem" }}
                            >
                                Hello {user.email}
                            </span>
                            <Button onClick={logOut}>Sign out</Button>
                        </div>
                    ) : (
                        <Button to="/login" tag={Link}>
                            Login
                        </Button>
                    )}
                </NavbarText>
            </Navbar>
            {/* <section className="container-fluid jumbotron"></section> */}
            {/* This is just a temp navigation bar */}

            {/* Section 1: Jumbotron */}
            <div style={{ minHeight: "75vh" }}>
                <Outlet />
            </div>
        </div>
    );
}
