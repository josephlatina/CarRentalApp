import React from "react";
import '../css/style.css'

const ReserveSummary = (props) => {

    return (
        <div class="row box" style={{height: 300 + "px"}}>
            <div class="row innerbox">
                <div class="col-6 field">
                    <h5 id="selected">Pick-up Location</h5>
                    <p>{props.pickuplocation}</p>
                </div>
                <div class="col-6 field">
                    <h5 id="selected">Return Location</h5>
                    <p>{props.returnlocation}</p>
                </div>
            </div>
            <div class="row innerbox">
                <div class="col-6 field">
                    <h5 id="selected">Pick-up Date/Time</h5>
                    <p>{props.pickupdate}</p>
                </div>
                <div class="col-6 field">
                    <h5 id="selected">Return Date/Time</h5>
                    <p>{props.returndate}</p>
                </div>
            </div>
        </div>
    )
}

export default ReserveSummary;