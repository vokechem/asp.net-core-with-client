import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input"

const Currency = () => {
  const [Editing, setEditing] = useState(false)
  const initialState = {
    code: "",
    description: ""
  };
  const url = "api/currency/";
  const { state, FetchAll } = useFetch(url);
  const { HandleDelete, HandleEditData } = useDelete(url);
  const { values, HandleChange, reset, FillData } = useInput(initialState);

  useEffect(() => {
    FetchAll();
  }, []);

  let TableHeader = ["Code", "Description", "Action"];
  let rowData = ["code", "description"];

  const handleEdit = k => {
    const data = {
      id:k.id,
      code: k.code,
      description: k.description
    };
    FillData(data)
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
            page={"Currency"}
            data={state.data}
            HandleOnClose={HandleOnClose}
            handleEdit={e => handleEdit(e)}
            handleDelete={e => handleDelete(e)}
            rowData={rowData}
            TableHeader={TableHeader}
          >
            <CurrenyForm
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

export default Currency;

const CurrenyForm = (props) => {
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
                label="Description"
                isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="description"
                  value={props.values.description}
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