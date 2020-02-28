import React, { useEffect, useRef } from "react";
const $ = require("jquery");
require("datatables.net-buttons-bs4")();
require("datatables.net-buttons/js/buttons.flash.js")();
require("datatables.net-buttons/js/buttons.html5.js")();
require("datatables.net-buttons/js/buttons.print.js")();
require("datatables.net-responsive-bs4");
$.DataTable = require("datatables.net-bs4");

const ApproversTable = props => {
  const TableElement = useRef(null);

  useEffect(
    () => {
      $(TableElement.current).DataTable({
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdfHtml5", "print"]
      });
    },
    [],
    () => {
      $(TableElement.current).DataTable.destroy(true);
    }
  );
  const listItems = props.TableHeader.map(data => <th key={data}>{data}</th>);

  const listRows = props.data.map(data => (
    <tr key={data.id}>
      <TableRow rowData={props.rowData} data={data} />

      <th>
        <a
         
          style={{ color: "#007bff" ,cursor:"pointer"}}
          onClick={e => props.HandleLeaveApproval(data, e)}
        >
         Approve
        </a>
       
      </th>
    </tr>
  ));
  return (
    <div>
      <h1 className="page-header">{props.page}</h1>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-inverse">
            <div className="panel-heading">
              <div className="panel-heading-btn">
                <a

                  className="btn btn-xs btn-icon btn-circle btn-default"
                  data-click="panel-expand"
                >
                  <i className="fa fa-expand" />
                </a>
                <a

                  className="btn btn-xs btn-icon btn-circle btn-success"
                  data-click="panel-reload"
                >
                  <i className="fa fa-redo" />
                </a>
                <a

                  className="btn btn-xs btn-icon btn-circle btn-warning"
                  data-click="panel-collapse"
                >
                  <i className="fa fa-minus" />
                </a>
                <a

                  className="btn btn-xs btn-icon btn-circle btn-danger"
                  data-click="panel-remove"
                >
                  <i className="fa fa-times" />
                </a>
              </div>
              <div className="panel-title ">
                <a
                 
                  
                >
                  {/* <i className="fas fa-plus-circle" /> */}
                </a>
                <span style={{ padding: 10 }}> </span>
              </div>
            </div>

            <div className="panel-body">
              <table
                className="table table-striped table-bordered responsive nowrap"
                ref={TableElement} width="100%"
              >
                <thead>
                  <tr>{listItems}</tr>
                </thead>
                <tbody>{listRows}</tbody>
                <tfoot>
                  <tr>{listItems}</tr>
                </tfoot>
              </table>
            </div>
  </div>
        </div>
      </div>
    </div>
  );
};

export default ApproversTable;
const TableRow = props => {
  const values = props.rowData;
  return values.map((row, index) => {
    var res = row.split(".");
    let column;
    if (res.length == 2) {
      column = (props.data[res[0]] || {})[res[1]];
    }else if(res.length ==3){
        column = ((props.data[res[0]] || {})[res[1]] ||{})[res[2]];
    } else {
      column = props.data[res[0]] || null;
    }

    return <th key={index}>{column}</th>;
  });
};
const Row = props => {
  return <th>{props.data}</th>;
};
