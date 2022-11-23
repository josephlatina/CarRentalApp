import React from "react";
import '../css/style.css'

const ReserveSummary = (props) => {

    return (
        <div className="row box">
            <div className="row innerbox">
                <div className="col-6 field">
                    <h5 id="selected">Pick-up Location</h5>
                    <p>{props.pickuplocation}</p>
                </div>
                <div className="col-6 field">
                    <h5 id="selected">Return Location</h5>
                    <p>{props.returnlocation}</p>
                </div>
            </div>
            <div className="row innerbox">
                <div className="col-6 field">
                    <h5 id="selected">Pick-up Date/Time</h5>
                    <p>{props.pickupdate}</p>
                </div>
                <div className="col-6 field">
                    <h5 id="selected">Return Date/Time</h5>
                    <p>{props.returndate}</p>
                </div>
            </div>
        </div>
    )
}

export default ReserveSummary;