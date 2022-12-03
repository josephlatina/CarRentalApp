import { useState } from "react";
import { useAuth } from "../../provider/authContext";

export default function CustomerInfoForm({ customer_id }) {
    const { updateCustomer, error, user } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [DOB, setDOB] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [unitNum, setUnitNum] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [license, setLicense] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        const [street_number, street_name] = streetAddress.split(" ");

        const customer = {
            id: customer_id,
            firstName,
            lastName,
            email,
            phoneNumber,
            DOB,
            streetAddress,
            unitNum,
            province,
            city,
            postalCode,
            license,
            street_name,
            street_number,
        };

        updateCustomer(customer);
    };

    return (
        <form className="Auth-form">
            <div className="Auth-form-content">
                <div className="text-center text-danger">{error}</div>

                <h3 className="header-text">Personal Detail</h3>
                <div className="form-group mt-3">
                    <label className="authLabel">First Name </label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control mt-1"
                        placeholder="First Name"
                        id="fname"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Last Name</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLasName(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Last Name"
                        id="lname"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Email Address"
                        id="email"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Phone Number</label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Phone Number"
                        id="phoneno"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Date of Birth</label>
                    <input
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Date of Birth"
                        id="bday"
                        type="date"
                    />
                </div>
                <h3 className="header-text">Address</h3>
                <div className="form-group mt-3">
                    <label className="authLabel">Street Address</label>
                    <input
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Street Address"
                        id="address"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Unit Number</label>
                    <input
                        value={unitNum}
                        onChange={(e) => setUnitNum(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Unit Number"
                        id="unitno"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Province</label>
                    <input
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Province"
                        id="province"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">Postal Code</label>
                    <input
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Postal Code"
                        id="postalcode"
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="authLabel">City</label>
                    <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control mt-1"
                        placeholder="City"
                        id="city"
                    />
                </div>
                <h3 className="header-text">Drivers License</h3>
                <div className="form-group mt-3">
                    <label className="authLabel">Drivers License Number</label>
                    <input
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Drivers License Number"
                        id="driversno"
                    />
                </div>

                <div className="d-grid gap-2 mt-3">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={submitHandler}
                    >
                        Update Info
                    </button>
                </div>
            </div>
        </form>
    );
}
