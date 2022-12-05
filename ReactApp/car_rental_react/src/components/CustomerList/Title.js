import React from 'react';

const Title = (props) => {
  return (
    <div className='card-title poppins-medium-white-25px text-center mt-3'>
          {props.children}
    </div>
  );
};

export default Title;
