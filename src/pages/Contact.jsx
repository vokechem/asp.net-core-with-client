import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input";
import Select from "react-select";

const Contact = () => {
  const [Editing, setEditing] = useState(false);
  const initialState = {
    mobile: "",
    email: "",
    idNo: "",
    website: "",
    telephone: "",
    countryId: null,
    countyId: null,
    postalAddress: "",
    street: ""
  };
  const url = "api/contact/";
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
    "Mobile",
    "Email",
    "IDNo",
    "Website",
    "Telephone",
    "PostalAddress",
    "Street",
    "Action"

  ];
  let rowData = ["mobile", "email", "idNo", "website", "telephone", "postalAddress", "street"];

  const handleEdit = k => {
    const data = {
      id: k.id,
      mobile: k.mobile,
      email: k.email,
      idNo: k.idNo,
      website: k.website,
      telephone: k.telephone,
      countryId: k.countryId,
      countyId: k.countyId,
      postalAddress: k.postalAddress,
      street: k.street
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
            page={"Contact"}
            data={state.data}
            HandleOnClose={HandleOnClose}
            handleEdit={e => handleEdit(e)}
            handleDelete={e => handleDelete(e)}
            rowData={rowData}
            TableHeader={TableHeader}
          >
            <ContactForm
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

export default Contact;

const ContactForm = props => {
  const { state, FetchAll } = useFetch("api/country");
  useEffect(() => {
    FetchAll();
  }, []);
  const CountryOptions = state.data.map((k, i) => {
    return {
      value: k.id.toString(),
      label: k.name.toString()
    };
  });
  return (
    <div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6 md-offset-2">
            <div className="form-group row m-b-10">
              <Label label="Mobile" isRequired={true} />
              <div className="col-md-8">
                <Input
                  name="mobile"
                  value={props.values.mobile}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Email" isRequired={true} />
              <div className="col-md-8">
                <Input
                  name="email"
                  value={props.values.email}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="IDNO" isRequired={true} />
              <div className="col-md-8">
                <Input
                  name="idNo"
                  value={props.values.idNo}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Website" isRequired={false} />
              <div className="col-md-8">
                <Input
                  name="website"
                  value={props.values.website}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Telephone" isRequired={false} />
              <div className="col-md-8">
                <Input
                  name="telephone"
                  value={props.values.telephone}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>

          </div>
          <div className="col-md-6 md-offset-2">

            <div className="form-group row m-b-10">
              <Label label="Country" isRequired={false} />
              <div className="col-md-8">
                <Select
                  name="countryId"
                  className="form-group"
                  defaultInputValue={props.selectOptions.countryId}
                  value={props.selectOptions.countryId}
                  onChange={props.handleSelectChange}
                  options={CountryOptions}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="County" isRequired={false} />
              <div className="col-md-8">
                <Select
                  name="countyId"
                  className="form-group"
                  defaultInputValue={props.selectOptions.countyId}
                  value={props.selectOptions.countyId}
                  onChange={props.handleSelectChange}
                  options={CountryOptions}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Postal Address" isRequired={true} />
              <div className="col-md-8">
                <Input
                  name="postalAddress"
                  value={props.values.postalAddress}
                  HandleChange={props.HandleChange}
                />
              </div>
            </div>
            <div className="form-group row m-b-10">
              <Label label="Street" isRequired={false} />
              <div className="col-md-8">
                <Input
                  name="street"
                  value={props.values.street}
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
