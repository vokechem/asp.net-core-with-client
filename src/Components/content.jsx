import React from "react";
const Content = props => {
  return (
    <div id='content' className='content'>
      {props.children}
    </div>
  );
};

export default Content;
