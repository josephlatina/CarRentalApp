import React from 'react';

const Card = (props) => {
  return (
    <div className='card' style={{backgroundColor:'#00000099'}}>{props.children}</div>
  );
};

export default Card;
