import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bank from "./pages/Banks";
import Currency from "./pages/Currency";
import Country from "./pages/Country";
import County from "./pages/County";
import Department from "./pages/Department";
import Company from "./pages/Company";
import Base from "./pages/Base";
import CostCenter from "./pages/CostCenter";
import Kpi from "./pages/Kpi";
import Contact from "./pages/Contact";
import BankBranch from "./pages/BankBranch";
import LeaveTypes from "./pages/LeaveTypes";
import UCCategories from "./pages/UCCategories";
import UserCodes from "./pages/UserCodes";
import Approvers from "./pages/Approvers";
import Employee from "./pages/Employee";
import Calender from "./pages/Calender";
import EmployeeMaster from "./pages/EmployeeMaster";
import LeaveApproval from "./pages/LeaveApproval";



function App() {
    return ( < BrowserRouter >
        <
        Base >
        <
        Switch >
        <
        Route path = "/"
        exact component = { LeaveApproval }
        />
        <
        Route path = "/LeaveApproval"
        exact component = { LeaveApproval }
        />
        <
        Route path = "/Calender"
        exact component = { Calender }
        /> <
        Route path = "/BankBranch"
        exact component = { BankBranch }
        /> <
        Route path = "/LeaveTypes"
        exact component = { LeaveTypes }
        /> <
        Route path = "/UCCategories"
        exact component = { UCCategories }
        /> <
        Route path = "/UserCodes"
        exact component = { UserCodes }
        /> <
        Route path = "/Currency"
        exact component = { Currency }
        /> <
        Route path = "/Approvers"
        exact component = { Approvers }
        /> <
        Route path = "/bank"
        exact component = { Bank }
        /> <
        Route path = "/employees"
        exact component = { Employee }
        /> <
        Route path = "/Country"
        exact component = { Country }
        /> <
        Route path = "/County"
        exact component = { County }
        /> <
        Route path = "/Company"
        exact component = { Company }
        /> <
        Route path = "/Department"
        exact component = { Department }
        /> <
        Route path = "/CostCenter"
        exact component = { CostCenter }
        /> <
        Route path = "/contact"
        exact component = { Contact }
        /> <
        Route path = "/kpis"
        exact component = { Kpi }
        /> < /
        Switch > <
        /Base> < /
        BrowserRouter >
    );
}

export default App;