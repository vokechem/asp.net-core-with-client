import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input";
import Select from "react-select";
import useGetData from "../Hooks/useGetData";
import EmployeeForm from "./EmployeeMaster"

const Employee = () => {
    const [Editing, setEditing] = useState(false);
    const initialState = {
        costCenterId: null,
        empNo: "",
        empNames: "",
        countyId: null,
        pinNo: null,
        nhifNo: "",
        nssfNo: "",
        departmentId: null,
        hireDate: new Date(),
        payStartDate: new Date(),
        payEndDate: new Date(),
        countryId: null,
        postalAddress: "",
        mobile: "",
        email: "",
        isDisabled: false,
        disabilityDesc: "",
        dob: new Date(),
        retirementDate: new Date(),
        maritalStatusId: null,
        genderId: null,
        languages: "",
        position: "",
        supervisor: "",
        payStatus: "",
        jobTypeId: null,
        jobGradeId: null,
        basicSalary: 0,
        bankId: null,
        bankBranchId: null,
        accNo: "",
        accName: ""
    };
    const url = "api/Employee/";
    const [state, FetchAll] = useGetData(url);
    const { HandleDelete, HandleEditData } = useDelete(url);
    const {
        values,
        HandleChange,
        reset,
        FillData,
        handleSelectChange,
        selectOptions
    } = useInput(initialState);

    useEffect(() => {
        FetchAll();
    }, []);

    let TableHeader = [
        "EmpNo",
        "EmpNames",
        "PINNo",
        "IDNo",
        "NSSFNo",
        "NHIFNo",
        "HireDate",
        "PostalAddress",
        "Mobile",
        "Email",
        "DOB",
        "Position",
        "BasicSalary",
        "Bank",
        "BankBranch",
        "AccNo",
        "AccName",
        "Action"
    ];
    let rowData = [
        "empNo",
        "empNames",
        "pinNo",
        "idNo",
        "nssfNo",
        "nhifNo",
        "hireDate",
        "postalAddress",
        "mobile",
        "email",
        "dob",
        "position",
        "basicSalary",
        "bank.name",
        "bankBranch.name",
        "accNo",
        "accName",
    ];

    const handleEdit = k => {
        const data = {
            costCenterId: k.costCenterId,
            empNo: k.empNo,
            empNames: k.empNames,
            countyId: k.countyId,
            pinNo: k.pinNo,
            nhifNo: k.nhifNo,
            nssfNo: k.nssfNo,
            departmentId: k.departmentId,
            hireDate: k.hireDate,
            payStartDate: k.payStartDate,
            payEndDate: k.payEndDate,
            countryId: k.countryId,
            postalAddress: k.postalAddress,
            mobile: k.mobile,
            email: k.email,
            isDisabled: k.isDisabled,
            disabilityDesc: k.disabilityDesc,
            dob: k.dob,
            retirementDate: k.retirementDate,
            maritalStatusId: k.maritalStatusId,
            genderId: k.genderId,
            languages: k.languages,
            position: k.position,
            supervisor: k.supervisor,
            payStatus: k.payStatus,
            jobTypeId: k.jobTypeId,
            jobGradeId: k.jobGradeId,
            basicSalary: k.basicSalary,
            bankId: k.bankId,
            bankBranchId: k.bankBranchId,
            accNo: k.accNo,
            accName: k.accName
        };
        FillData(data, {
            costCenterId: {
                value: k.costCenterId || "",
                label: (k.costCenter || "").ccName || ""
            },
            bankId: {
                value: k.bankId || "",
                label: (k.bank || "").name || ""
            },
            bankBranchId: {
                value: k.bankBranchId || "",
                label: (k.bankBranch || "").name || ""
            },
            departmentId: {
                value: k.departmentId || "",
                label: (k.department || "").name || ""
            },
            countyId: {
                value: k.countyId || "",
                label: (k.county || "").name || ""
            },
            countryId: {
                value: k.countryId || "",
                label: (k.country || "").name || ""
            },
            genderId: {
                value: k.genderId || "",
                label: (k.gender || "").name || ""
            },
            jobTypeId: {
                value: k.jobTypeId || "",
                label: (k.jobType || "").name || ""
            },
            jobGradeId: {
                value: k.jobGradeId || "",
                label: (k.jobGrade || "").name || ""
            },
            maritalStatusId: {
                value: k.maritalStatusId || "",
                label: (k.maritalStatus || "").name || ""
            },
        });
        setEditing(true);
    };
    const handleDelete = k => {
        HandleDelete(k);
    };
    const HandleSubmit = e => {
        e.preventDefault();
        usePostData(url, values);

        reset();
    };
    const HandleUpdate = e => {
        e.preventDefault();
        HandleEditData(values);
        reset();
    };
    const HandleOnClose = e => {
        e.preventDefault();
        setEditing(false);
        reset();
    };
    return (
        <div>
            {state.IsLoading ? (
                <h1>Loading</h1>
            ) : (
                    <DataTable
                        page={"Employee"}
                        data={state.data}
                        HandleOnClose={HandleOnClose}
                        handleEdit={e => handleEdit(e)}
                        handleDelete={e => handleDelete(e)}
                        rowData={rowData}
                        TableHeader={TableHeader}
                    >
                        <EmployeeForm
                            values={values}
                            selectOptions={selectOptions}
                            IsEditing={Editing}
                            HandleUpdate={HandleUpdate}
                            HandleOnClose={HandleOnClose}
                            HandleSubmit={HandleSubmit}
                            handleSelectChange={handleSelectChange}
                            HandleChange={HandleChange}
                        />
                    </DataTable>
                )}
        </div>
    );
};

export default Employee;


