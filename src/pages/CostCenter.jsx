import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input"
import Select from "react-select";

const CostCenter = () => {
  const [Editing, setEditing] = useState(false)
  const initialState = {
    ccName: "",
    companyId: "",
    contactId:""
  };
  const url = "api/CostCenter/";
  const { state, FetchAll } = useFetch(url);
  const { HandleDelete, HandleEditData } = useDelete(url);
  const { values, HandleChange, reset, FillData,handleSelectChange,selectOptions } = useInput(initialState);

  useEffect(() => {
    FetchAll();
  }, []);

  let TableHeader = ["Name", "Company",  "Action"];
  let rowData = ["ccName", "company.compName"];

  const handleEdit = k => {
    const data = {
      id:k.id,
      ccName: k.ccName,
      companyId: k.companyId,
      contactId:k.contactId
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
            page={"CostCenter"}
            data={state.data}
            HandleOnClose={HandleOnClose}
            handleEdit={e => handleEdit(e)}
            handleDelete={e => handleDelete(e)}
            rowData={rowData}
            TableHeader={TableHeader}
          >
            <CostCenterForm
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

export default CostCenter;

const CostCenterForm = (props) => {
    const { state, FetchAll } = useFetch("api/company");
    useEffect(()=>{
        FetchAll();
    },[])
    const CompanyOptions = state.data.map((k, i) => {
        return {
          value: k.id.toString(),
          label: k.compName.toString()
        };
      });
  return (
    <div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-10 md-offset-2">
            <div className="form-group row m-b-10">
              <Label
                label="Name"
                isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="ccName"
                  value={props.values.ccName}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
             
            <div className="form-group row m-b-10">
              <Label
                label="Company"
                isRequired={true} />
              <div className="col-md-6">
              <Select
            name="companyId"
            className="form-group"
            defaultInputValue={props.selectOptions.companyId}
            value={props.selectOptions.companyId}
            onChange={props.handleSelectChange}
            options={CompanyOptions}
          />
              </div>
            </div>
            {/* <div className="form-group row m-b-10">
              <Label
                label="Contact"
                isRequired={false} />
              <div className="col-md-6">
                <Input
                  name="contact"
                  value={props.values.contact}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div> */}
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