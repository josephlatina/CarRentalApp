import { Link, useLoaderData } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";

export function loader({ params }) {
    return params.branchId;
}

export default function BranchView() {
    const branchId = useLoaderData();

    return (
        <section className="container">
            <h2 className="text-center">Branch ID No.{branchId} </h2>
            <Row>
                <Container
                    className="text-center p-5 rounded shadow-lg"
                    style={{ backgroundColor: "#232323" }}
                >
                    <h2 style={{ textAlign: "center", color: "white" }}>
                        Rental List
                    </h2>
                    <Button tag={Link} to={`rentals`}>
                        View
                    </Button>
                </Container>
            </Row>
            <Row className="mt-5">
                <Container
                    className="text-center p-5 rounded shadow-lg"
                    style={{ backgroundColor: "#232323" }}
                >
                    <h2 style={{ textAlign: "center", color: "white" }}>
                        Car List
                    </h2>
                    <Button tag={Link} to={`cars`}>
                        View
                    </Button>
                </Container>
            </Row>
        </section>
    );
}
