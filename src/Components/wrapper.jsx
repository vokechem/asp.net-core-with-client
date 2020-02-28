import React from "react";
const Wrapper = props => {
  return (
    <div
      id='page-container'
      className='fade page-sidebar-fixed page-header-fixed'>
      {props.children}
      <a

        className='btn btn-icon btn-circle btn-success btn-scroll-to-top fade'
        data-click='scroll-top'>
        <i className='fa fa-angle-up' />
      </a>
    </div>
  );
};

export default Wrapper;
