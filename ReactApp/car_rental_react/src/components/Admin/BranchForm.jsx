import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label, Row } from "reactstrap";

export default function BranchForm() {
    const [streetAddress, setStreetAddress] = useState("");
    const [unitNumber, setUnitNumber] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const [street_number, street_name] = streetAddress.split(" ");

        try {
            await axios.post("http://127.0.0.1:8000/api/branches/", {
                street_number,
                street_name,
                unit_number: unitNumber,
                province,
                city,
                postal_code: postalCode,
            });

            setSuccess(true);
        } catch (e) {
            const errorMessage = Object.keys(e.response.data).map(
                (k) => k + ": " + e.response.data[k] + "\n"
            );
            setError(errorMessage);
        }
    };

    return (
        <Form>
            {error && <div className="text-center text-danger">{error}</div>}
            {success && (
                <div className="text-center">
                    Success!. Please{" "}
                    <Button onClick={() => navigate(0)}>Reload</Button>
                </div>
            )}
            <h3 style={{ textAlign: "center", color: "white" }}>
                Create a new branch
            </h3>
            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">Unit Number</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        value={unitNumber}
                        onChange={(e) => setUnitNumber(e.target.value)}
                        placeholder="Enter Unit Number"
                    />
                </div>
            </Row>
            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">Street Address</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Enter Address"
                    />
                </div>
            </Row>

            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">Province</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        placeholder="Enter Province"
                    />
                </div>
            </Row>
            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">City</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter City"
                    />
                </div>
            </Row>
            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">Postal Code</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Enter Postal Code"
                    />
                </div>
            </Row>
            <div className="text-center">
                <Button
                    type="submit"
                    className="w-25 p-2"
                    onClick={handleSubmit}
                >
                    Create
                </Button>
            </div>
        </Form>
    );
}
