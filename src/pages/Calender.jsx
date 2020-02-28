import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Input, { Label } from "../Components/Input";
import useFetch from "../Hooks/useFetch";
import useInput from "../Hooks/useInput";
import usePostData from "../Hooks/usePostData";
import useDelete from "../Hooks/useDelete";
import useGetData from "../Hooks/useGetData";
import '../main.scss'
import Select from "react-select";
import { render } from '@testing-library/react';


const Calender = () => {
    const initialState = {
        leaveTypeId: null,
        title: 'Annual leave',
        start: new Date(),
        end: new Date(),
        weekends: false,
        rendering: 'background'
    };
    const url = "api/leaveapplication/";
    const { state, FetchAll } = useFetch(url);
    const {
        values,
        HandleChange,
        reset,
        FillData,
        handleSelectChange,
        selectOptions
    } = useInput(initialState);

    const [LeaveTypes, FetchLeaves] = useGetData("api/LeaveTypes");

    const LeaveOptions = LeaveTypes.data.map((k, i) => {
        return {
            value: (k.id) || "",
            label: (k.description) || ""
        };
    });
    const LeavesAppllied = state.data.map((k, i) => {
      
        return {
            title: (k.leaveType.description) || "",
            start: new Date(k.start) || "",
            end: new Date(k.end) || "",
            color: (k.color)

        };
    });


    // events={[{ title: 'Annual leave', start: "2020-02-22", end: "2020-02-28", rendering: 'background', color: 'green' }]}

    const HandleSubmit = e => {
        e.preventDefault();
        usePostData(url, values);
        reset();
      };

    useEffect(() => {
        FetchAll();
        FetchLeaves();
    }, []);

    const handleSelectClick = (arg) => { // bind with an arrow function

        // var dateStr = prompt('Enter a date in YYYY-MM-DD format');
        // var date = new Date(dateStr + 'T00:00:00'); // will be in local time

        // if (!isNaN(date.valueOf())) { // valid?

        //     alert('Great. Now, update your database...');
        // } else {
        //     alert('Invalid date.');
        // }
    }
    return (
        <div>
            <h1 className="page-header">Calender</h1>

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
                                    href="#modal-message"
                                    data-toggle="modal"
                                    className="btn btn-sm btn-icon btn-circle btn-success"
                                >
                                    <i className="fas fa-plus-circle" />
                                </a>
                                <span style={{ padding: 10 }}>Apply Leave</span>
                            </div>
                        </div>

                        <div className="panel-body">
                            <FullCalendar
                                defaultView="dayGridMonth"
                                weekends={false}
                                height= {550}
                                themeSystem={'bootstrap'}
                                editable={true}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                selectable={true}
                                events={LeavesAppllied}
                                header={{
                                    left: 'prev,next, today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek'
                                }}
                                select={handleSelectClick}


                            />
                        </div>

                        <div className="modal modal-message fade" id="modal-message">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Apply leave</h4>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-hidden="true"
                                        >
                                            ×
                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-10 md-offset-2">
                                                <div className="form-group row m-b-10">
                                                    <Label label="Leave Type" isRequired={true} />
                                                    <div className="col-md-6">
                                                        <Select
                                                            name="leaveTypeId"
                                                            className="form-group"
                                                            defaultInputValue={selectOptions.leaveTypeId}
                                                            value={selectOptions.leaveTypeId}
                                                            onChange={handleSelectChange}
                                                            options={LeaveOptions}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row m-b-10">
                                                    <Label label="Start Date" isRequired={true} />
                                                    <div className="col-md-6">
                                                        <input
                                                            type='date'
                                                            name='start'
                                                            required
                                                            onChange={HandleChange}
                                                            value={values.start}
                                                            className='form-control'

                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row m-b-10">
                                                    <Label label="End Date" isRequired={true} />
                                                    <div className="col-md-6">
                                                        <input
                                                            type='date'
                                                            name='end'
                                                            required
                                                            onChange={HandleChange}
                                                            value={values.end}
                                                            className='form-control'

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

                                        >
                                            Close
        </a>
                                        <button
                                            type="button"
                                            onClick={HandleSubmit}
                                            className="btn btn-primary"
                                        >
                                            Apply
          </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calender;