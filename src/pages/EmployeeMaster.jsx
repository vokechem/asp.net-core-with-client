import React, { useEffect, useState } from "react";
import DataTable from "../Components/Tbl";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input";
import Select from "react-select";
import useGetData from "../Hooks/useGetData";


const EmployeeMaster = () => {
    const [Editing, setEditing] = useState(false);
    const [Resetter, setResetter] = useState(true);
    const initialState = {
        costCenterId: null,
        empNo: "",
        empNames: "",
        countyId: null,
        pinNo: null,
        nhifNo: "",
        idNo: "",
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
        disabilityDesc: "N/a",
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

    useEffect(() => {
        FetchAll();
    }, []);

    const { HandleDelete, HandleEditData } = useDelete(url);
    const {
        values,
        HandleChange,
        reset,
        FillData,
        handleSelectChange,
        selectOptions
    } = useInput(initialState);



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
       FetchAll();
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
    const TongleLayout = () => {

        if (Resetter) {
            setResetter(false)
        } else {
            setResetter(true)
        }

    }

    const [Bank, FetchBanks] = useGetData("api/bank");
    const [BankBranch, FetchBankBranch] = useGetData("api/bankbranch");
    const [Department, Fetch] = useGetData("api/department");
    const [CostCenterData, FetchCostCenter] = useGetData("api/costcenter");
    const [country, FetchCountry] = useGetData("api/country");
    const [county, FetchCounty] = useGetData("api/county");
    const [JobGrade, FetchJobGrade] = useGetData("api/usercode/category/JobGrade");
    const [JobType, FetchJobType] = useGetData("api/usercode/category/JobType");
    const [Gender, FetchGender] = useGetData("api/usercode/category/Gender");
    const [MaritalStatus, FetchMaritalStatus] = useGetData("api/usercode/category/MaritalStatus");

    const DepartmentOptions = Department.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const BankOptions = Bank.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const BankBranchOptions = BankBranch.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const GenderOptions = Gender.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const MaritalStatusOptions = MaritalStatus.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const JobTypeOptions = JobType.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const JobGradeOptions = JobGrade.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const countyOptions = county.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const countryOptions = country.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    const CostCenterOptions = CostCenterData.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.ccName.toString()
        };
    });
    useEffect(() => {
        FetchAll();
        FetchBanks();
        FetchBankBranch();
        FetchCostCenter();
        Fetch();
        FetchCountry();
        FetchCounty();
        FetchJobGrade();
        FetchJobType();
        FetchGender();
        FetchMaritalStatus();
    }, []);
    if (Resetter) {
        return (<div>
            <div className="panel-title ">
                <a
                    onClick={TongleLayout}
                    className="btn btn-sm btn-icon btn-circle btn-success"
                >
                    <i className="fas fa-plus-circle" />
                </a>
                <span style={{ padding: 10 }}> Add New</span>
            </div>
            <form className="form-control-with-bg">
                <div id="wizard"> <ul>
                    <li className="col-md-4 col-sm-4 col-6">
                        <a href="#step-1">
                            <span className="number">1</span>
                            <span className="info text-ellipsis">
                                Personal Info
									{/* <small className="text-ellipsis">Name, Address, IC No and DOB</small> */}
                            </span>
                        </a>
                    </li>
                    <li className="col-md-4 col-sm-4 col-6">
                        <a href="#step-2">
                            <span className="number">2</span>
                            <span className="info text-ellipsis">
                                Other Info
									{/* <small className="text-ellipsis">Email and phone no. is required</small> */}
                            </span>
                        </a>
                    </li>
                    <li className="col-md-4 col-sm-4 col-6">
                        <a href="#step-3">
                            <span className="number">3</span>
                            <span className="info text-ellipsis">
                                Payment info
									{/* <small className="text-ellipsis">Enter your username and password</small> */}
                            </span>
                        </a>
                    </li>

                </ul>

                    <div>

                        <div id="step-1">

                            <fieldset>

                                <div className="row">
                                    <div className="col-md-6 md-offset-2">
                                        <div className="form-group row m-b-10">
                                            <Label label="Costcenter" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="costCenterId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.costCenterId}
                                                    value={selectOptions.costCenterId}
                                                    onChange={handleSelectChange}
                                                    options={CostCenterOptions}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="EmpNo" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="empNo"
                                                    value={values.empNo}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Employee Names" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="empNames"
                                                    value={values.empNames}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="NHIF No" isRequired={false} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="nhifNo"
                                                    value={values.nhifNo}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="NSSF No" isRequired={false} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="nssfNo"
                                                    value={values.nssfNo}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="PIN No" isRequired={false} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="pinNo"
                                                    value={values.pinNo}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                     </div>
                                    <div className="col-md-6 md-offset-2">
                                        <div className="form-group row m-b-10">
                                            <Label label="Marital Status" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="maritalStatusId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.maritalStatusId}
                                                    value={selectOptions.maritalStatusId}
                                                    onChange={handleSelectChange}
                                                    options={MaritalStatusOptions}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Sex" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="genderId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.genderId}
                                                    value={selectOptions.genderId}
                                                    onChange={handleSelectChange}
                                                    options={GenderOptions}
                                                />
                                            </div>
                                        </div>


                                        <div className="form-group row m-b-10">
                                            <Label label="IsDisabled" isRequired={false} />
                                            <div className="col-md-8">
                                                <input
                                                    type='checkbox'
                                                    name='isDisabled'
                                                    onChange={HandleChange}
                                                    checked={values.isDisabled}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="DisabilityDesc" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="disabilityDesc"
                                                    value={values.disabilityDesc}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="DOB" isRequired={true} />
                                            <div className="col-md-8">
                                                <input
                                                    type='date'
                                                    name='dob'
                                                    required
                                                    onChange={HandleChange}
                                                    value={values.dob}
                                                    className='form-control'

                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Retirement Date" isRequired={true} />
                                            <div className="col-md-8">
                                                <input
                                                    type='date'
                                                    name='retirementDate'
                                                    required
                                                    onChange={HandleChange}
                                                    value={values.retirementDate}
                                                    className='form-control'

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>

                        </div>
                        <div id="step-2">

                            <fieldset>

                                <div className="row">
                                    <div className="col-md-6 md-offset-2">
                                        <div className="form-group row m-b-10">
                                            <Label label="Mobile" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="mobile"
                                                    value={values.mobile}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Email" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="email"
                                                    value={values.email}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Postal Address" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="postalAddress"
                                                    value={values.postalAddress}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="IDNO" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="idNo"
                                                    value={values.idNo}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Country" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="countryId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.countryId}
                                                    value={selectOptions.countryId}
                                                    onChange={handleSelectChange}
                                                    options={countryOptions}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="County" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="countyId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.countyId}
                                                    value={selectOptions.countyId}
                                                    onChange={handleSelectChange}
                                                    options={countyOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 md-offset-2">
                                        <div className="form-group row m-b-10">
                                            <Label label="Languages" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="languages"
                                                    value={values.languages}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Position" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="position"
                                                    value={values.position}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="PayStatus" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="payStatus"
                                                    value={values.payStatus}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="job Type" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="jobTypeId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.jobTypeId}
                                                    value={selectOptions.jobTypeId}
                                                    onChange={handleSelectChange}
                                                    options={JobTypeOptions}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="job Grade" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="jobGradeId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.jobGradeId}
                                                    value={selectOptions.jobGradeId}
                                                    onChange={handleSelectChange}
                                                    options={JobGradeOptions}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Department" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="departmentId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.departmentId}
                                                    value={selectOptions.departmentId}
                                                    onChange={handleSelectChange}
                                                    options={DepartmentOptions}
                                                />
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>

                            </fieldset>

                        </div>
                        <div id="step-3">
                            <fieldset>

                                <div className="row">
                                    <div className="col-md-6 md-offset-2">
                                        <div className="form-group row m-b-10">
                                            <Label label="HireDate" isRequired={true} />
                                            <div className="col-md-8">
                                                <input
                                                    type='date'
                                                    name='hireDate'
                                                    required
                                                    onChange={HandleChange}
                                                    value={values.hireDate}
                                                    className='form-control'
                                                    aria-describedby='DOBHelp'
                                                    placeholder='Enter Hiredate'
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row m-b-10">
                                            <Label label="PayStartDate" isRequired={true} />
                                            <div className="col-md-8">
                                                <input
                                                    type='date'
                                                    name='payStartDate'
                                                    required
                                                    onChange={HandleChange}
                                                    value={values.payStartDate}
                                                    className='form-control'

                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="PayEndDate" isRequired={true} />
                                            <div className="col-md-8">
                                                <input
                                                    type='date'
                                                    name='payEndDate'
                                                    required
                                                    onChange={HandleChange}
                                                    value={values.payEndDate}
                                                    className='form-control'

                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row m-b-10">
                                            <Label label="BasicSalary" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="basicSalary"
                                                    value={values.basicSalary}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-6 md-offset-2">
                                    <div className="form-group row m-b-10">
                                        <Label label="Bank" isRequired={true} />
                                        <div className="col-md-8">
                                            <Select
                                                name="bankId"
                                                className="form-group"
                                                defaultInputValue={selectOptions.bankId}
                                                value={selectOptions.bankId}
                                                onChange={handleSelectChange}
                                                options={BankOptions}
                                            />
                                        </div>
                                    </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="Bank Branch" isRequired={true} />
                                            <div className="col-md-8">
                                                <Select
                                                    name="bankBranchId"
                                                    className="form-group"
                                                    defaultInputValue={selectOptions.bankBranchId}
                                                    value={selectOptions.bankBranchId}
                                                    onChange={handleSelectChange}
                                                    options={BankBranchOptions}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="AccNo" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="accNo"
                                                    value={values.accNo}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row m-b-10">
                                            <Label label="AccName" isRequired={true} />
                                            <div className="col-md-8">
                                                <Input
                                                    name="accName"
                                                    value={values.accName}
                                                    HandleChange={HandleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>
                            <p><a className="btn btn-primary btn-lg float-left" onClick={HandleSubmit}>Submit</a></p>
                        </div>
                    </div>

                </div>

            </form>
        </div>);
    } else {
        return (
            <DataTable
                page={"Employee"}
                data={state.data}
                HandleOnClose={HandleOnClose}
                handleEdit={e => handleEdit(e)}
                handleDelete={e => handleDelete(e)}
                rowData={rowData}
                TableHeader={TableHeader}
                TongleLayout={TongleLayout}
            />
        )
    }
}

export default EmployeeMaster;