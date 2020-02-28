import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input";
import Select from "react-select";

const Company = () => {
  const [Editing, setEditing] = useState(false);
  const initialState = {
    compName: "",
    nhifNo: "",
    nssfNo: "",
    currencyId: null,
    contact: ""
  };
  const url = "api/company/";
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
    "Company Name",
    "NHIF No",
    "NSSF No",
    "Currency",
    "Action"
  ];
  let rowData = ["compName", "nhifNo", "nssfNo", "currency.description"];

  const handleEdit = k => {
    const data = {
      id: k.id,
      compName: k.compName,
      nhifNo: k.nhifNo,
      nssfNo: k.nssfNo,
      currencyId: k.currencyId.value
    };
    FillData(data);
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
          page={"Company"}
          data={state.data}
          HandleOnClose={HandleOnClose}
          handleEdit={e => handleEdit(e)}
          handleDelete={e => handleDelete(e)}
          rowData={rowData}
          TableHeader={TableHeader}
        >
          <CompanyForm
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

export default Company;

const CompanyForm = props => {
  const { state, FetchAll } = useFetch("api/currency");
  useEffect(() => {
    FetchAll();
  }, []);
  const CurrencyOptions = state.data.map((k, i) => {
    return {
      value: k.id.toString(),
      label: k.description.toString()
    };
  });
  return (
    <div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-10 md-offset-2">
            <div className="form-group row m-b-10">
              <Label label="Comp Name" isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="compName"
                  value={props.values.compName}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="NHIF No" isRequired={false} />
              <div className="col-md-6">
                <Input
                  name="nhifNo"
                  value={props.values.nhifNo}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="NSSF No" isRequired={false} />
              <div className="col-md-6">
                <Input
                  name="nssfNo"
                  value={props.values.nssfNo}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Currency" isRequired={true} />
              <div className="col-md-6">
                <Select
                  name="currencyId"
                  className="form-group"
                  defaultInputValue={props.selectOptions.currencyId}
                  value={props.selectOptions.currencyId}
                  onChange={props.handleSelectChange}
                  options={CurrencyOptions}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Contact" isRequired={false} />
              <div className="col-md-6">
                <Input
                  name="contact"
                  value={props.values.contact}
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
