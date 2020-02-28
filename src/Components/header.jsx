import React from "react";
import { Link } from "react-router-dom";
const PageHeader = () => {
  return (
    <div>
      {/* <!-- begin #header --> */}
      <div id="header" className="header navbar-default">
        {/* <!-- begin navbar-header --> */}
        <div className="navbar-header">
          <a href="index.html" className="navbar-brand">
            <span className="navbar-logo" /> <b>HR</b> Management
          </a>
          <button
            type="button"
            className="navbar-toggle"
            data-click="sidebar-toggled"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        {/* <!-- end navbar-header -->
			
			<!-- begin header-nav --> */}
        <ul className="navbar-nav navbar-right">        
         
          <li className="dropdown navbar-user">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src="assets/img/user/user-13.jpg" alt="" />
              <span className="d-none d-md-inline">Steve</span>{" "}
              <b className="caret" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href="" className="dropdown-item">
                Edit Profile
              </a>            
              <Link to="/Calender" className="dropdown-item">
                Calendar
              </Link>              
              <div className="dropdown-divider" />
              <a href="" className="dropdown-item">
                Log Out
              </a>
            </div>
          </li>
        </ul>
        {/* <!-- end header navigation right --> */}
      </div>
      {/* <!-- end #header --> */}
    </div>
  );
};

export default PageHeader;
