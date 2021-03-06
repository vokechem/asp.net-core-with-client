import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input"

const Department = () => {
  const [Editing, setEditing] = useState(false)
  const initialState = {
    code: "",
    name: ""
  };
  const url = "api/department/";
  const { state, FetchAll } = useFetch(url);
  const { HandleDelete, HandleEditData } = useDelete(url);
  const { values, HandleChange, reset, FillData } = useInput(initialState);

  useEffect(() => {
    FetchAll();
  }, []);

  let TableHeader = ["Code", "Name", "Action"];
  let rowData = ["code", "name"];

  const handleEdit = k => {
    const data = {
      id:k.id,
      code: k.code,
      name: k.name
    };
    FillData(data)
    setEditing(true)
   
  };
  const handleDelete = k => {
    HandleDelete(k);
    FetchAll();
  };
  const HandleSubmit = e => {
    e.preventDefault();
    usePostData(url, values);
    FetchAll();
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
            page={"Department"}
            data={state.data}
            HandleOnClose={HandleOnClose}
            handleEdit={e => handleEdit(e)}
            handleDelete={e => handleDelete(e)}
            rowData={rowData}
            TableHeader={TableHeader}
          >
            <DepartmentForm
              values={values}
              IsEditing={Editing}
              HandleUpdate={HandleUpdate}
              HandleOnClose={HandleOnClose}
              HandleSubmit={HandleSubmit}
              HandleChange={HandleChange} />
          </DataTable>
        )}
    </div>
  );
};

export default Department;

const DepartmentForm = (props) => {
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
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a className="btn btn-white" data-dismiss="modal" onClick={props.HandleOnClose}>
          Close
        </a>
       {props.IsEditing?( <button
          type="submit"
          onClick={props.HandleUpdate}
          className="btn btn-primary"
        >
          Update
        </button>):( <button
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