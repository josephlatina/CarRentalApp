import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

export default function BranchCard({ branch }) {
    return (
        <Container
            className="text-center shadow p-5 mb-5 w-75"
            style={{ backgroundColor: "#1c1c1c", borderRadius: "50px" }}
        >
            <h2 style={{ color: "#e3e3e3" }}>Branch ID No. {branch.id}</h2>
            <div>{branch.street_number + " " + branch.street_name}</div>
            <div>
                {branch.city +
                    ", " +
                    branch.province +
                    " " +
                    branch.postal_code}
            </div>
            <hr />
            <Button
                className="w-50"
                tag={Link}
                to={`/admin/branches/${branch.id}`}
            >
                Select
            </Button>
        </Container>
    );
}
