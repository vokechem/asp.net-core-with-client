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

const Approvers = () => {
    const [Editing, setEditing] = useState(false);
    const initialState = {
        module: "",
        usersId: null,
        approvalLevel: "",
        approverTitle: ""
    };
    const url = "api/Approvers/";
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
        "Module",
        "Approver",
        "Approval Level",
        "Approver Title",
        "Action"

    ];
    let rowData = [
        "module",
        "approver.email",
        "approvalLevel",
        "approverTitle"

    ];

    const handleEdit = k => {
        const data = {
            module: k.module,
            usersId: k.usersId,
            approvalLevel: k.approvalLevel,
            approverTitle: k.approverTitle

        };
        FillData(data, {
            usersId: {
                value: k.usersId || "",
                label: (k.approver || "").email || ""
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
                        page={"Approvers"}
                        data={state.data}
                        HandleOnClose={HandleOnClose}
                        handleEdit={e => handleEdit(e)}
                        handleDelete={e => handleDelete(e)}
                        rowData={rowData}
                        TableHeader={TableHeader}
                    >
                        <ApproversForm
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

export default Approvers;

const ApproversForm = props => {
    const [Users, Fetch] = useGetData("api/account");

    const UserOptions = Users.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.email.toString()
        };
    });
    useEffect(() => {
        Fetch();
    }, []);

    return (
        <div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-10 md-offset-2">
                        <div className="form-group row m-b-10">
                            <Label label="Module" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="module"
                                    value={props.values.module}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>


                        <div className="form-group row m-b-10">
                            <Label label="Approver" isRequired={true} />
                            <div className="col-md-6">
                                <Select
                                    name="UsersId"
                                    className="form-group"
                                    defaultInputValue={props.selectOptions.UsersId}
                                    value={props.selectOptions.UsersId}
                                    onChange={props.handleSelectChange}
                                    options={UserOptions}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Approval Level" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="approvalLevel"
                                    value={props.values.approvalLevel}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Approver Title" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="approverTitle"
                                    value={props.values.approverTitle}
                                    HandleChange={props.HandleChange}
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
