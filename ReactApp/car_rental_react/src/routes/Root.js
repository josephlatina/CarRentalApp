import { Link, NavLink, Outlet } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

export default function Root() {
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
                        <Link to="/auth">Auth,</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/rent">Rent,</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/home">Home,</Link>
                    </NavLink>
                </NavItem>
            </Nav>
            {/* Section 1: Jumbotron */}
            <div>
                <Outlet />
            </div>
        </div>
    );
}
