import React, { useEffect, useState } from "react";
import DataTable from "../Components/ApproversTable";
import Base from "./Base";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import Input, { Label } from "../Components/Input";
import Select from "react-select";
import useGetData from "../Hooks/useGetData";
import useLeaveApproval from "../Hooks/useLeaveApproval";

const LeaveApproval = () => {
  const [Editing, setEditing] = useState(false);
  const url = "api/LeaveApprovalWorkFlow/";
  const [state, FetchAll] = useGetData(url);
  const { HandleDelete, HandleEditData } = useDelete(url);
 

  useEffect(() => {
    FetchAll();
  }, []);

  let TableHeader = [
    "Employee",
    "Leave Type",
    "Start Date",
    "End Date",
    
    "Action"
  ];
  let rowData = [
    "application.employee.email",
    "application.leaveType.description",
    "application.start",
    "application.end"
  ];

  const HandleLeaveApproval = k => {
  
    useLeaveApproval(url+k.id, []);
  };
  const handleDelete = k => {
    HandleDelete(k);
  };

  const HandleOnClose = e => {
    e.preventDefault();
    setEditing(false);
    
  };
  return (
    <div>
      {state.IsLoading ? (
        <h1>Loading</h1>
      ) : (
          <DataTable
            page={"Leave Approval"}
            data={state.data}
            HandleOnClose={HandleOnClose}
            HandleLeaveApproval={e => HandleLeaveApproval(e)}
            rowData={rowData}
            TableHeader={TableHeader}
          >
           
          </DataTable>
        )}
    </div>
  );
};

export default LeaveApproval;

