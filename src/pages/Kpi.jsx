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

const KPIs = () => {
  const [Editing, setEditing] = useState(false);
  const initialState = {
    kpiCode: "",
    kpiDescription: "",
    companyId: null,
    departmentId: null,
    weight: "",
    target: "",
    remarks: ""
  };
  const url = "api/kpis/";
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
    "KPI Code",
    "Description",
    "Company",
    "Department",
    "Weight",
    "Target",
    "Action"
  ];
  let rowData = [
    "kpiCode",
    "kpiDescription",
    "company.compName",
    "department.name",
    "weight",
    "target"
  ];

  const handleEdit = k => {
    const data = {
      id: k.id,
      kpiCode: k.kpiCode,
      kpiDescription: k.kpiDescription,
      companyId: k.companyId,
      departmentId: k.departmentId,
      weight: k.weight.toString(),
      target: k.target,
      remarks: k.remarks
    };
    FillData(data, {
      companyId: {
        value: k.companyId || "",
        label: (k.company || "").compName || ""
      },
      departmentId: {
        value: k.departmentId || "",
        label: (k.department || "").name || ""
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
            page={"KPIs"}
            data={state.data}
            HandleOnClose={HandleOnClose}
            handleEdit={e => handleEdit(e)}
            handleDelete={e => handleDelete(e)}
            rowData={rowData}
            TableHeader={TableHeader}
          >
            <KPIsForm
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

export default KPIs;

const KPIsForm = props => {
  const [company, Fetch] = useGetData("api/department");
  const [CompanyData, GetCompanies] = useGetData("api/company");

  const DepartmentOptions = company.data.map((k, i) => {
    return {
      value: k.id.toString(),
      label: k.name.toString()
    };
  });
  useEffect(() => {
    GetCompanies();
    Fetch();
  }, []);
  const CompanyOptions = CompanyData.data.map((k, i) => {
    return {
      value: k.id.toString(),
      label: k.compName.toString()
    };
  });
  return (
    <div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6 md-offset-2">
            <div className="form-group row m-b-10">
              <Label label="KPI" isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="kpiCode"
                  value={props.values.kpiCode}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Description" isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="kpiDescription"
                  value={props.values.kpiDescription}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>

            <div className="form-group row m-b-10">
              <Label label="Company" isRequired={true} />
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
            <div className="form-group row m-b-10">
              <Label label="Department" isRequired={true} />
              <div className="col-md-6">
                <Select
                  name="departmentId"
                  className="form-group"
                  defaultInputValue={props.selectOptions.departmentId}
                  value={props.selectOptions.departmentId}
                  onChange={props.handleSelectChange}
                  options={DepartmentOptions}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 md-offset-2">
            <div className="form-group row m-b-10">
              <Label label="Weight" isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="weight"
                  value={props.values.weight}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Target" isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="target"
                  value={props.values.target}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Remarks" isRequired={true} />
              <div className="col-md-6">
                <Input
                  name="remarks"
                  value={props.values.remarks}
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
