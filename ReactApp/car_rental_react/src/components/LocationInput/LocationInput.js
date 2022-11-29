import React, { useEffect, useRef, useState } from "react";
import "./LocationInput.css";

function LocationInput(props) {
  const { inputType, inputPlaceholder, className, branches,onChange } = props;
  const [arrBranch,setArrBranch] = useState([]);
  const [showList,setShowList] = useState(false);
  const [textInput,setTextInput] = useState("");
  const itemConRef = useRef();


  useEffect(() => {
    if(branches && branches.length) {
      setArrBranch([...branches]);
    }
    else {
      setArrBranch([]);
    }
  },[branches])

  useEffect(() => {
    document.addEventListener("click",documentClickHandler);
    return () => {
      document.removeEventListener("click",documentClickHandler);
    }
  },[])

  const documentClickHandler = (event) => {
    setShowList(false);
  }

  const inputChangeHandler = (event) => {
    const val = event.target.value;
    setTextInput(val);
    if(val) {
      const arrData = branches.filter((item) => {
        return item.city.toLowerCase().includes(val.toLowerCase());
      });
      setArrBranch(arrData);
    }
    else {
      setArrBranch([...branches]);
    }
    setShowList(true);
  }

  const inputClick = (event) => {
    setShowList(true);
    event.preventDefault();
    event.stopPropagation();
  }

  const itemClickHandler = (branch,event) => {
    const result = `${branch.street_number} ${branch.street_name}, ${branch.city}`
    onChange?.(branch);
    setTextInput(result);
    setShowList(false);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div className="autoCompleteInput">
      <input
        className={`enter-location poppins-normal-white-17px ${className || ""}`}
        name="enterlocation"
        placeholder={inputPlaceholder}
        type={inputType}
        value={textInput}
        onChange={inputChangeHandler}
        onClick={inputClick}
        required
      />
      {arrBranch && arrBranch.length && showList && <div ref={itemConRef} className="autoCompleteItems">
          {arrBranch.map((branch,index) => {
              return <div className="item" key={index + "-" + branch.id} value={branch.id} 
              onClick={(event) => itemClickHandler(branch,event)}>{branch.street_number} {branch.street_name}, {branch.city}</div>
          })}
      </div>} 
    </div>
  );
}

export default LocationInput;
