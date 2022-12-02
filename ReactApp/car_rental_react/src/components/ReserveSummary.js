import React from "react";
import '../css/style.css'

const ReserveSummary = (props) => {

    console.log(props.pickuplocation.street_number);

    return (
        <div className="row box">
            <div className="row innerbox">
                <div className="col-6 field">
                    <h5 id="selected">Pick-up Location</h5>
                    <p>{props.pickuplocation[0]?.street_number} {props.pickuplocation[0]?.street_name}, {props.pickuplocation[0]?.city}</p>
                </div>
                <div className="col-6 field">
                    <h5 id="selected">Return Location</h5>
                    <p>{props.returnlocation[0]?.street_number} {props.returnlocation[0]?.street_name}, {props.returnlocation[0]?.city}</p>
                </div>
            </div>
            <div className="row innerbox">
                <div className="col-6 field">
                    <h5 id="selected">Pick-up Date/Time</h5>
                    <p>{props.pickupdate.toLocaleString()}</p>
                </div>
                <div className="col-6 field">
                    <h5 id="selected">Return Date/Time</h5>
                    <p>{props.returndate.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default ReserveSummary;