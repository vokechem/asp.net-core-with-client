import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input"
import Select from "react-select";
import useGetData from "../Hooks/useGetData";

const UserCode = () => {
    const [Editing, setEditing] = useState(false)
    const initialState = {
        code: "",
        name: "",
        ucCategoryId: null
    };
    const url = "api/UserCode/";
    const { state, FetchAll } = useFetch(url);
    const { HandleDelete, HandleEditData } = useDelete(url);
    const { values, HandleChange, reset, FillData, handleSelectChange, selectOptions } = useInput(initialState);

    useEffect(() => {
        FetchAll();
    }, []);

    let TableHeader = ["Code", "Name", "Category", "Action"];
    let rowData = ["code", "name", "category.name"];

    const handleEdit = k => {
        const data = {
            id: k.id,
            code: k.code,
            name: k.name,
            ucCategoryId: k.ucCategoryId
        };
        FillData(data, {
            ucCategoryId: {
                value: k.ucCategoryId || "",
                label: (k.category || "").name || ""
            }
        })
        setEditing(true)

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
        HandleEditData(values)
        reset();
    };
    const HandleOnClose = e => {
        e.preventDefault();
        setEditing(false)
        reset();
    };
    return (
        <div>
            {state.IsLoading ? (
                <h1>Loading</h1>
            ) : (
                    <DataTable
                        page={"User Codes"}
                        data={state.data}
                        HandleOnClose={HandleOnClose}
                        handleEdit={e => handleEdit(e)}
                        handleDelete={e => handleDelete(e)}
                        rowData={rowData}
                        TableHeader={TableHeader}
                    >
                        <UserCodeForm
                            values={values}
                            selectOptions={selectOptions}
                            IsEditing={Editing}
                            HandleUpdate={HandleUpdate}
                            HandleOnClose={HandleOnClose}
                            HandleSubmit={HandleSubmit}
                            handleSelectChange={handleSelectChange}
                            HandleChange={HandleChange} />
                    </DataTable>
                )}
        </div>
    );
};

export default UserCode;

const UserCodeForm = (props) => {
    const [Category, FetchCategory] = useGetData("api/UCCategory");

    const CategoryOptions = Category.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    useEffect(() => {
        FetchCategory();
    }, []);
    return (
        <div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-10 md-offset-2">
                        <div className="form-group row m-b-10">
                            <Label
                                label="Code"
                                isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="code"
                                    value={props.values.code}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label
                                label="Name"
                                isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="name"
                                    value={props.values.name}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="UCCategory" isRequired={true} />
                            <div className="col-md-6">
                                <Select
                                    name="ucCategoryId"
                                    className="form-group"
                                    defaultInputValue={props.selectOptions.ucCategoryId}
                                    value={props.selectOptions.ucCategoryId}
                                    onChange={props.handleSelectChange}
                                    options={CategoryOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a className="btn btn-white" data-dismiss="modal" onClick={props.HandleOnClose}>
                    Close
        </a>
                {props.IsEditing ? (<button
                    type="submit"
                    onClick={props.HandleUpdate}
                    className="btn btn-primary"
                >
                    Update
        </button>) : (<button
                        type="submit"
                        onClick={props.HandleSubmit}
                        className="btn btn-primary"
                    >
                        Save
        </button>)}
            </div>
        </div>
    );
};