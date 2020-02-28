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

const BankBranch = () => {
    const [Editing, setEditing] = useState(false);
    const initialState = {
        code: "",
        name: "",
        bankId: null,
        contactId: null,

    };
    const url = "api/bankbranch/";
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
        "Code",
        "Name",
        "Bank",
        "Action"


    ];
    let rowData = [
        "code",
        "name",
        "bank.name",

    ];

    const handleEdit = k => {
        const data = {
            id: k.id,
            code: k.code,
            name: k.name,
            bankId: k.bankId,
            contactId: k.contactId
        };
        FillData(data, {
            companyId: {
                value: k.bankId || "",
                label: (k.bank || "").name || ""
            },
            departmentId: {
                value: k.contactId || "",
                label: (k.contact || "").email || ""
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
                        page={"Bank Branches"}
                        data={state.data}
                        HandleOnClose={HandleOnClose}
                        handleEdit={e => handleEdit(e)}
                        handleDelete={e => handleDelete(e)}
                        rowData={rowData}
                        TableHeader={TableHeader}
                    >
                        <BankBranchForm
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

export default BankBranch;

const BankBranchForm = props => {
    const [Bank, Fetch] = useGetData("api/bank");
    const [ContactData, FestchContact] = useGetData("api/contact");

    const BankOptions = Bank.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.name.toString()
        };
    });
    useEffect(() => {
        Fetch();
        FestchContact();
    }, []);
    const ContactOptions = ContactData.data.map((k, i) => {
        return {
            value: k.id.toString(),
            label: k.email.toString()
        };
    });
    return (
        <div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-10 md-offset-2">
                        <div className="form-group row m-b-10">
                            <Label label="Code" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="code"
                                    value={props.values.code}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Name" isRequired={true} />
                            <div className="col-md-6">
                                <Input
                                    name="name"
                                    value={props.values.name}
                                    HandleChange={props.HandleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row m-b-10">
                            <Label label="Bank" isRequired={true} />
                            <div className="col-md-6">
                                <Select
                                    name="bankId"
                                    className="form-group"
                                    defaultInputValue={props.selectOptions.bankId}
                                    value={props.selectOptions.bankId}
                                    onChange={props.handleSelectChange}
                                    options={BankOptions}
                                />
                            </div>
                        </div>
                        <div className="form-group row m-b-10">
                            <Label label="Contact" isRequired={true} />
                            <div className="col-md-6">
                                <Select
                                    name="contactId"
                                    className="form-group"
                                    defaultInputValue={props.selectOptions.contactId}
                                    value={props.selectOptions.contactId}
                                    onChange={props.handleSelectChange}
                                    options={ContactOptions}
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
