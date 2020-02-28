import React from 'react';
const Input = (props) => {
  return (<input
    type="text"
    name={props.name}
    value={props.value}
    onChange={props.HandleChange}
    data-parsley-group="step-1"
    data-parsley-required="true"
    className="form-control"
    required
  />);
}
const Label = (props) => {
  return (
    <label className="col-md-3 col-form-label text-md-right">
      {props.label} <span className="text-danger">{props.isRequired ? (<span>*</span>) : (<span></span>)}</span>
    </label>
  );
}


export { Label }
export default Input;