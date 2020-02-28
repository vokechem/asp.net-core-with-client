import React from "react";
import { Link } from "react-router-dom";
import useValidation from "../Hooks/useValidation";
const { Validaterole } = useValidation();
const Sidebar = () => {
  return (
    <div>
      <div id="sidebar" className="sidebar">
        <div data-scrollbar="true" data-height="100%">
          <ul className="nav">
            <li className="nav-profile">
              <a data-toggle="nav-profile">
                <div className="cover with-shadow"></div>
                <div className="image">
                  {/* <img src="assets/img/user/user-13.jpg" alt="" /> */}
                </div>
                <div className="info">
                  <b className="caret pull-right"></b>
                  Steve Mutunga
                  <small>Software developer</small>
                </div>
              </a>
            </li>
            {/* <li>
                            <ul className="nav nav-profile">
                                <li><a ><i className="fa fa-cog"></i> Settings</a></li>
                                <li><a ><i className="fa fa-pencil-alt"></i> Send Feedback</a></li>
                                <li><a ><i className="fa fa-question-circle"></i> Helps</a></li>
                            </ul>
                        </li> */}
          </ul>

          <ul className="nav">
            <li className="nav-header">Navigation</li>
            {Validaterole("System Admin", "View") ? <SystemAdmin /> : null}
            {Validaterole("Configurations", "View") ? <Configurations /> : null}
            {Validaterole("HR", "View") ? <HR /> : null}
            {Validaterole("Performance", "View") ? <Performance /> : null}

            <li>
              <a

                className="sidebar-minify-btn"
                data-click="sidebar-minify"
              >
                <i className="fa fa-angle-double-left"></i>
              </a>
            </li>
            {/* <!-- end sidebar minify button --> */}
          </ul>
          {/* <!-- end sidebar nav --> */}
        </div>
        {/* <!-- end sidebar scrollbar --> */}
      </div>
      <div className="sidebar-bg"></div>
    </div>
  );
};
const SystemAdmin = () => {
  return (
    <li className="has-sub">
      <a >
        <b className="caret"></b>
        <i className="fa fa-th-large"></i>
        <span>System Admin</span>
      </a>
      <ul className="sub-menu">
        {Validaterole("Company", "View") ? (
          <li>
            {" "}
            <Link to="/Company"> Company</Link>
          </li>
        ) : null}
        {Validaterole("CostCenter", "View") ? (
          <li>
            {" "}
            <Link to="/CostCenter"> Cost Center</Link>
          </li>
        ) : null}
        {Validaterole("Department", "View") ? (
          <li>
            <Link to="/Department">Department</Link>
          </li>
        ) : null}
        {Validaterole("Users", "View") ? (
          <li>
            {" "}
            <Link to="/users"> Users</Link>
          </li>
        ) : null}
        {Validaterole("approvers", "View") ? (
          <li>
            {" "}
            <Link to="/approvers"> Approvers</Link>
          </li>
        ) : null}
      </ul>
    </li>
  );
};
const Configurations = () => {
  return (
    <li className="has-sub">
      <a >
        <b className="caret"></b>
        <i className="fa fa-cog"></i>
        <span>Configurations</span>
      </a>
      <ul className="sub-menu">
        {Validaterole("Bank", "View") ? (
          <li>
            {" "}
            <Link to="/bank"> Banks</Link>
          </li>
        ) : null}
        {Validaterole("BankBranch", "View") ? (
          <li>
            {" "}
            <Link to="/BankBranch"> BankBranch</Link>
          </li>
        ) : null}
        {Validaterole("Currency", "View") ? (
          <li>
            <Link to="/Currency">Currency</Link>
          </li>
        ) : null}
        {Validaterole("Country", "View") ? (
          <li>
            <Link to="/Country">Country</Link>
          </li>
        ) : null}

        {Validaterole("UCCategories", "View") ? (
          <li>
            <Link to="/UCCategories">UC Categories</Link>
          </li>
        ) : null}
        {Validaterole("UserCodes", "View") ? (
          <li>
            <Link to="/UserCodes">UserCodes</Link>
          </li>
        ) : null}
        {Validaterole("Contact", "View") ? (
          <li>
            <Link to="/Contact">Contacts</Link>
          </li>
        ) : null}
        {Validaterole("County", "View") ? (
          <li>
            <Link to="/County">County</Link>
          </li>
        ) : null}
      </ul>
    </li>
  );
};

const HR = () => {
  return (
    <li className="has-sub">
      <a>
        <b className="caret"></b>

        <i className="fa fa-briefcase"></i>
        <span>HR Management</span>
      </a>
      <ul className="sub-menu">
        {Validaterole("Employee", "View") ? (
          <li>
            {" "}
            <Link to="/Employees"> Employees</Link>
          </li>
        ) : null}
        {Validaterole("leaveTypes", "View") ? (
          <li>
            {" "}
            <Link to="/leaveTypes"> leave Types</Link>
          </li>
        ) : null}
        {Validaterole("Calender", "View") ? (
          <li>
            {" "}
            <Link to="/Calender"> Laeve Application</Link>
          </li>
        ) : null}
         {Validaterole("LeaveApproval", "View") ? (
          <li>
            {" "}
            <Link to="/LeaveApproval">Leave Approval</Link>
          </li>
        ) : null}

      </ul>
    </li>
  );
};

const Performance = () => {
  return (
    <li className="has-sub">
      <a >
        <b className="caret"></b>
        <i className="fa fa-trophy"></i>
        <span>Performance</span>
      </a>
      <ul className="sub-menu">
        {Validaterole("kpis", "View") ? (
          <li>
            {" "}
            <Link to="/kpis"> KPIs</Link>
          </li>
        ) : null}
        {Validaterole("KpiEntry", "View") ? (
          <li>
            {" "}
            <Link to="/KpiEntry"> KPI Entry</Link>
          </li>
        ) : null}
      </ul>
    </li>
  );
};

export default Sidebar;
