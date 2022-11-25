import { Link, NavLink, Outlet } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";
import { useAuth } from "../provider/authContext";

export default function Root() {
    const { isSignedIn, user, logOut } = useAuth();

    return (
        <div className="root-style font-link">
            <section className="container-fluid jumbotron"></section>
            {/* This is just a temp navigation bar */}
            <Nav>
                <NavItem>
                    <NavLink>
                        <Link to="/">index,</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/car">Car,</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/rent">Rent,</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/login">Login,</Link>
                    </NavLink>
                </NavItem>
                {isSignedIn && (
                    <>
                        <NavItem> Hello {user.email}</NavItem>{" "}
                        <NavItem>
                            <Button onClick={logOut}>Sign out</Button>
                        </NavItem>
                    </>
                )}
            </Nav>
            {/* Section 1: Jumbotron */}
            <div>
                <Outlet />
            </div>
        </div>
    );
}
