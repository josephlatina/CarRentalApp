import React from "react";
import '../css/style.css'

const CarFilter = (props) => {
    const {
        manufacturerfilter: manufacturers,
        fueltypefilter: fueltype,
        cartypefilter: cartype,
        manufacturerfilterchange: handleManufacturerFilterChange,
        fueltypefilterchange: handleFuelTypeFilterChange,
        cartypefilterchange: handleCarTypeFilterChange
    } = props;

    return (
        <div>
            <div>
                <h4>Filter By</h4>
                <br/>
                <h5 id="selected">Manufacturer</h5>
                {manufacturers?.map((item, index) => {
                    return <div key={index}>
                        <label>
                            <input key={index} type="checkbox" value={item} onChange={handleManufacturerFilterChange}></input>
                            &nbsp;&nbsp;{item}
                        </label>
                    </div>;
                    // return <p key={index}>{item}</p>;
                })}
                <br/>
                <h5 id="selected">Fuel Type</h5>
                {fueltype?.map((item, index) => {
                    return <div key={index}>
                        <label>
                            <input key={index} type="checkbox" value={item} onChange={handleFuelTypeFilterChange}></input>
                            &nbsp;&nbsp;{item}
                        </label>
                    </div>;
                })}
                <br/>
                <h5 id="selected">Car Type</h5>
                {cartype?.map((item, index) => {
                    return <div key={index}>
                        <label>
                            <input key={index} type="checkbox" value={item.car_type_id} onChange={handleCarTypeFilterChange}></input>
                            &nbsp;&nbsp;{item.description}
                        </label>
                    </div>;
                    })}
            </div>
        </div>
    )
}

export default CarFilter;