import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import BranchCard from "../../components/Admin/BranchCard";
import BranchForm from "../../components/Admin/BranchForm";

export default function AdminHomePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const getBranches = async () => {
            setIsLoading(true);
            const response = await axios.get(
                "http://127.0.0.1:8000/api/branches"
            );
            setBranches(response.data);
            setIsLoading(false);
        };

        getBranches();
    }, []);

    const renderedBranches = branches.map((e) => (
        <BranchCard branch={e} key={e.id} />
    ));

    if (isLoading) return <div>Is Loading</div>;

    return (
        <section className="container">
            <Row>
                <Container
                    className="text-center p-5 w-75 rounded shadow-lg"
                    style={{ backgroundColor: "#232323" }}
                >
                    <h2 style={{ textAlign: "center", color: "white" }}>
                        Customer List
                    </h2>
                    <Button tag={Link} to="/admin/customers">
                        View
                    </Button>
                </Container>
            </Row>
            <Row
                className="mt-5 p-5 rounded shadow-lg"
                style={{ backgroundColor: "#232323" }}
            >
                <h2 style={{ textAlign: "center", color: "white" }}>
                    Branch List
                </h2>
                <Col>
                    <Container>{renderedBranches}</Container>
                </Col>
                <Col>
                    <Container>
                        <BranchForm />
                    </Container>
                </Col>
            </Row>
        </section>
    );
}
