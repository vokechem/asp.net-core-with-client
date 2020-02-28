import React, { Component } from "react";
const Form = () => {
    return (<div>

        <form action="/" method="POST" class="form-control-with-bg">

            <div id="wizard">

                <ul>
                    <li class="col-md-3 col-sm-4 col-6">
                        <a href="#step-1">
                            <span class="number">1</span>
                            <span class="info text-ellipsis">
                                Personal Info
									<small class="text-ellipsis">Name, Address, IC No and DOB</small>
                            </span>
                        </a>
                    </li>
                    <li class="col-md-3 col-sm-4 col-6">
                        <a href="#step-2">
                            <span class="number">2</span>
                            <span class="info text-ellipsis">
                                Enter your contact
									<small class="text-ellipsis">Email and phone no. is required</small>
                            </span>
                        </a>
                    </li>
                    <li class="col-md-3 col-sm-4 col-6">
                        <a href="#step-3">
                            <span class="number">3</span>
                            <span class="info text-ellipsis">
                               Payment info
									<small class="text-ellipsis">Enter your username and password</small>
                            </span>
                        </a>
                    </li>
                    <li class="col-md-3 col-sm-4 col-6">
                        <a href="#step-4">
                            <span class="number">4</span>
                            <span class="info text-ellipsis">
                                Completed
									<small class="text-ellipsis">Complete Registration</small>
                            </span>
                        </a>
                    </li>
                </ul>

                <div>

                    <div id="step-1">

                        <fieldset>

                            <div class="row">
herer
                            </div>

                        </fieldset>

                    </div>

                    <div id="step-2">

                        <fieldset>

                            <div class="row">

                                <div class="col-md-8 offset-md-2">
                                    <legend class="no-border f-w-700 p-b-0 m-t-0 m-b-20 f-s-16 text-inverse">You contact info, so that we can easily reach you</legend>

                                    <div class="form-group row m-b-10">
                                        <label class="col-md-3 text-md-right col-form-label">Phone Number</label>
                                        <div class="col-md-6">
                                            <input type="number" name="phone" placeholder="123-456-7890" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group row m-b-10">
                                        <label class="col-md-3 text-md-right col-form-label">Email Address</label>
                                        <div class="col-md-6">
                                            <input type="email" name="email" placeholder="someone@example.com" class="form-control" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </fieldset>

                    </div>

                    <div id="step-3">

                        <fieldset>

                            <div class="row">

                                <div class="col-md-8 offset-md-2">
                                    <legend class="no-border f-w-700 p-b-0 m-t-0 m-b-20 f-s-16 text-inverse">Select your login username and password</legend>

                                    <div class="form-group row m-b-10">
                                        <label class="col-md-3 text-md-right col-form-label">Username</label>
                                        <div class="col-md-6">
                                            <input type="text" name="username" placeholder="johnsmithy" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group row m-b-10">
                                        <label class="col-md-3 text-md-right col-form-label">Pasword</label>
                                        <div class="col-md-6">
                                            <input type="password" name="password" placeholder="Your password" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group row m-b-10">
                                        <label class="col-md-3 text-md-right col-form-label">Confirm Pasword</label>
                                        <div class="col-md-6">
                                            <input type="password" name="password2" placeholder="Confirmed password" class="form-control" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </fieldset>

                    </div>

                    <div id="step-4">
                        <div class="jumbotron m-b-0 text-center">
                            <h2 class="text-inverse">Register Successfully</h2>
                            <p class="m-b-30 f-s-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat commodo porttitor. <br />Vivamus eleifend, arcu in tincidunt semper, lorem odio molestie lacus, sed malesuada est lacus ac ligula. Aliquam bibendum felis id purus ullamcorper, quis luctus leo sollicitudin. </p>
                            <p><a href="javascript:;" class="btn btn-primary btn-lg">Proceed to User Profile</a></p>
                        </div>
                    </div>

                </div>

            </div>

        </form>
    </div>);
}
 
export default Form;