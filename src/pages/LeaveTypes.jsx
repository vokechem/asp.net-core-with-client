import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input";
import Select from "react-select";
import useGetData from "../Hooks/useGetData";

const LeaveTypes = () => {
    const [Editing, setEditing] = useState(false);
    const initialState = {
        leaveCode: "",
        description: "",
        allowPay: false,
        userCodesId: "",
        applyToAll: true,
        allowCarryOver: true,
        maxCarryOver: 0,
        leaveDays: 0,
        effectiveDate: new Date()

    };
    const url = "api/LeaveTypes/";
    const { state, FetchAll } = useFetch(url);
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
        "LeaveCode",
        "Description",
        "Job Grade",
        "Leave Days",
        "Action"
    ];
    let rowData = ["leaveCode", "description", "jobGrade.name", "leaveDays"];

    const handleEdit = k => {
        const data = {
            id: k.id,
            leaveCode: k.leaveCode,
            description: k.description,
            allowPay: k.allowPay,
            userCodesId: k.userCodesId,
            applyToAll: k.applyToAll,
            allowCarryOver: k.allowCarryOver,
            maxCarryOver: k.maxCarryOver,
            leaveDays: k.leaveDays,
            effectiveDate: k.effectiveDate
        };
        FillData(data, {
            userCodesId: {
                value: k.userCodesId || "",
                label: (k.jobGrade || "").name || ""
            }
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
                        page={"Leave Types"}
                        data={state.data}
                        HandleOnClose={HandleOnClose}
                        handleEdit={e => handleEdit(e)}
                        handleDelete={e => handleDelete(e)}
                        rowData={rowData}
                        TableHeader={TableHeader}
                    >
                        <LeaveTypesForm
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

export default LeaveTypes;

const LeaveTypesForm = props => {

    const [JobGrade, FetchJobGrade] = useGetData("api/usercode/category/JobGrade");

    const options = JobGrade.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    useEffect(() => {
        FetchJobGrade();
    }, []);
    return (
        <div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6 md-offset-2">
                        <div className="form-group row m-b-10">
                            <Label label="Leave Code" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="leaveCode"
                                    value={props.values.leaveCode}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Description" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="description"
                                    value={props.values.description}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Job Grade" isRequired={true} />
                            <div className="col-md-6">
                                <Select
                                    name="userCodesId"
                                    className="form-group"
                                    defaultInputValue={props.selectOptions.userCodesId}
                                    value={props.selectOptions.userCodesId}
                                    onChange={props.handleSelectChange}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Allow Pay" isRequired={false} />
                            <div className="col-md-6">
                                <input
                                    type='checkbox'
                                    name='allowPay'
                                    onChange={props.HandleChange}
                                    checked={props.values.allowPay}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 md-offset-2">
                        <div className="form-group row m-b-10">
                            <Label label="LeaveDays" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="leaveDays"
                                    value={props.values.leaveDays}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Max CarryOver" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="maxCarryOver"
                                    value={props.values.maxCarryOver}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Apply To All" isRequired={false} />
                            <div className="col-md-6">
                                <input
                                    type='checkbox'
                                    name='applyToAll'
                                    onChange={props.HandleChange}
                                    checked={props.values.applyToAll}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Allow CarryOver" isRequired={false} />
                            <div className="col-md-6">
                                <input
                                    type='checkbox'
                                    name='allowCarryOver'
                                    onChange={props.HandleChange}
                                    checked={props.values.allowCarryOver}
                                />
                            </div>
                        </div>


                    </div>

                </div>
            </div>
            <div className="modal-footer">
                <a
                    className="btn btn-white"
                    data-dismiss="modal"
                    onClick={props.HandleOnClose}
                >
                    Close
        </a>
                {props.IsEditing ? (
                    <button
                        type="submit"
                        onClick={props.HandleUpdate}
                        className="btn btn-primary"
                    >
                        Update
          </button>
                ) : (
                        <button
                            type="submit"
                            onClick={props.HandleSubmit}
                            className="btn btn-primary"
                        >
                            Save
          </button>
                    )}
            </div>
        </div>
    );
};
