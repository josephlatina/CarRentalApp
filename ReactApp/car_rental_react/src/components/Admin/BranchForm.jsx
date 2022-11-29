import { Button, Form, Input, Label, Row } from "reactstrap";

export default function BranchForm() {
    return (
        <Form>
            <h3 style={{ textAlign: "center", color: "white" }}>
                Create a new branch
            </h3>
            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">Street Address</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        placeholder="Enter Address"
                    />
                </div>
            </Row>
            <Row className="innerbox">
                <div className="col-6 field" style={{ padding: "1rem" }}>
                    <Label id="selected">Unit Number</Label>
                    <Input
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            borderStyle: "none",
                        }}
                        placeholder="Enter Unit Number"
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
                        placeholder="Enter Postal Code"
                    />
                </div>
            </Row>
            <div className="text-center">
                <Button type="submit" className="w-25 p-2">
                    Create
                </Button>
            </div>
        </Form>
    );
}
