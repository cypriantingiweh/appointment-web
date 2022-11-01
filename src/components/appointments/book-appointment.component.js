import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppointmentDataService from "../../services/appointment.service.js";
import UserDataService from "../../services/user.service"


const genderOptions = [ {label: "Female", value: "female", },{label: "Male", value: "male",}];

const firstTimeOptions = [ {label: "YES", value: "YES"},{ label: "NO",value: "NO", }];
const statusOptions = [
   {label: "PENDING", value: "PENDING"},{ label: "PASSED",value: "PASSED", },
    {label: "MISSED", value: "MISSED"},{ label: "RESHEDULED",value: "RESHEDULED", }
  ];


export default class BookAppointment extends Component {
  constructor(props) {
    super(props);
 console.log(this.props)
   this.state ={
    id:0,
    comment_before: "",
    comment_after: "",
    status: "PENDING",
    appointment_date: "",
    appointment_time: "",
    request_date: "",
    userId:0,
    doctor:1,
    names:"",
    email:"",
    password:"",
    address:"",
    city:"",
    number:"",
    phone:"",
    sex:"Female",
    age:0,
    first_time:"YES",
    isUpdate:false
  };

  this.handleOnChange = this.handleOnChange.bind(this);
  this.createUser = this.createUser.bind(this);
  this.updateUser = this.updateUser.bind(this);

  }

  componentDidMount(){
      // console.log(this.state.id);
    const storageAppointment = localStorage.getItem("appointMent");
    const appointment = JSON.parse(storageAppointment);
  if(appointment !==null){
       this.setState({
      id:appointment.id,
      comment_before: appointment.comment_before,
      comment_after: appointment.comment_after,
      status: appointment.status,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      request_date: appointment.request_date,
      userId:appointment.user.id,
      doctor:appointment.doctor,
      names:appointment.user.names,
     email:appointment.user.email,
     address:appointment.user.address,
     city:appointment.user.city,
     number:appointment.user.phone,
     phone:appointment.user.phone,
     sex:appointment.user.sex,
     age:appointment.user.age,
     role: "PATIENT",
     isUpdate:true
    })
  }
 
  }

  componentWillUnmount(){
    localStorage.removeItem("appointMent");
  }
updateUser() {
    var usersData = {
    id:this.state.userId,
    names:this.state.names,
     email:this.state.email,
     address:this.state.address,
     city:this.state.city,
     number:this.state.phone,
     phone:this.state.phone,
     sex:this.state.sex,
     age:this.state.age,
    };
    UserDataService.update(usersData)
      .then(response => { 
          AppointmentDataService.update({
            id:this.state.id,
            comment_before: this.state.comment_before,
            comment_after: this.state.comment_after,
            status: this.state.status,
            appointment_date: this.state.appointment_date,
            appointment_time: this.state.appointment_time,
            request_date: this.state.request_date,
            userId:response.data.id,
            doctor:this.state.doctor,
          })
      .then(() => {
      //  this.props.history.push("/appointment");
       <Link to={"/"} />
      })
      .catch(e => {
        console.log(e);
      });
      })
      .catch(e => {
        console.log(e);
      });
   }


   createUser() {
    var usersData = {
      
      names:this.state.names,
     email:this.state.email,
     address:this.state.address,
     city:this.state.city,
     number:this.state.phone,
     phone:this.state.phone,
     sex:this.state.sex,
     age:this.state.age,
     role: "PATIENT"
    };
    UserDataService.create(usersData)
      .then(response => { 
            AppointmentDataService.create({
            comment_before: this.state.comment_before,
            comment_after: this.state.comment_after,
            status: this.state.status,
            appointment_date: this.state.appointment_date,
            appointment_time: this.state.appointment_time,
            request_date: this.state.request_date,
            userId:response.data.id,
            doctor:this.state.doctor,
          })
      .then(() => {
       this.props.history.push("/appointment");
      })
      .catch(e => {
        console.log(e);
      });
      })
      .catch(e => {
        console.log(e);
      });
   }

   handleOnChange(event){
    const {value, name} = event.target;
    this.setState(prevalue =>{
       return{ ...prevalue, [name]:value}
    })  
  }


   render() {
    return (
      <div className="submit-form">
        
            <div className="row">
               <Link to={"/appointment"} className="icon-back col-md-1">
              </Link>
              <div className="col-md-4">
              <h3 className="new-record">{this.state.isUpdate ? <span>EDITING APPOINTMENT</span> :<span>NEN RECORD</span>}</h3>
            </div>
              <div className="new-record-line"></div>

          </div>
            <h5 className="mt-4">General Information</h5>

            <div className="row">
              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="names" className="text-muted py-2">Names</label>
                    <input
                      type="text"
                      className="form-control"
                      id="names"
                      required
                      value={this.state.names}
                      onChange={this.handleOnChange}
                      name="names"
                    />
                  </div>
              </div>
              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="phone" className="text-muted py-2">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      required
                      value={this.state.phone}
                      onChange={this.handleOnChange}
                      name="phone"
                    />
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="email" className="text-muted py-2">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      required
                      value={this.state.email}
                      onChange={this.handleOnChange}
                      name="email"
                    />
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="age" className="text-muted py-2">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      required
                      value={this.state.age}
                      onChange={this.handleOnChange}
                      name="age"
                    />
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="sex" className="text-muted py-2">Sex</label>
                  <select value={this.state.sex} className="form-control icon-select" onChange={this.handleOnChange} id="sex"
                      required name="sex">
                      {genderOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
              </div>
            </div>

            <hr />

            <h5 className="mt-4">Appointment Information</h5>
            <div className="row">

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="appointment_date" className="text-muted py-2">Appointment Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="appointment_date"
                      required
                      value={this.state.appointment_date}
                      onChange={this.handleOnChange}
                      name="appointment_date"
                    />
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="first_time" className="text-muted py-2">First Time</label>

                    <select className="form-control icon-select" value={this.state.first_time} onChange={this.handleOnChange} id="first_time"
                      required name="first_time">
                      {firstTimeOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="request_date" className="text-muted py-2">Request Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="request_date"
                      required
                      value={this.state.request_date}
                      onChange={this.handleOnChange}
                      name="request_date"
                    />
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="status" className="text-muted py-2">Appointment Status</label>
                  
                    <select value={this.state.status} className="form-control icon-select" onChange={this.handleOnChange} id="status"
                      required name="status">
                      {statusOptions.map((option) => (
                        <option  value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="appointment_time" className="text-muted py-2">Appointment Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="appointment_time"
                      required
                      value={this.state.appointment_time}
                      onChange={this.handleOnChange}
                      name="appointment_time"
                    />
                  </div>
              </div>
            </div>

           {this.state.first_time === "YES" ? (
              <div>
             <h5 className="mt-4">Address Information</h5>
            <div className="row">

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="address" className="text-muted py-2">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      required
                      value={this.state.address}
                      onChange={this.handleOnChange}
                      name="address"
                    />
                  </div>
              </div>

              <div className="col-md-2 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="city" className="text-muted py-2">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      required
                      value={this.state.city}
                      onChange={this.handleOnChange}
                      name="city"
                    />
                  </div>
              </div>
              </div>
              </div>):null}

            <h5 className="mt-4">Notes</h5>
            <div className="row">
              <div className="col-md-4 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="comment_before" className="text-muted py-2">Comment before</label>
                    <textarea
                      className="form-control"
                      id="comment_before"
                      required
                      value={this.state.comment_before}
                      onChange={this.handleOnChange}
                      name="comment_before"
                      rows={5}
                    cols={6}
                    />


                  </div>
              </div>

              <div className="col-md-4 col-sm-10">
                 <div className="form-group">
                    <label htmlFor="comment_after" className="text-muted py-2">Comment after</label>
                    <textarea
                    className="form-control"
                      id="comment_after"
                      value={this.state.comment_after}
                      onChange={this.handleOnChange}
                       name="comment_after"
                      rows={5}
                      cols={6}
                  />

                  </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-11"></div>
              <div className="col-md-1">
         
                <button onClick={this.state.isUpdate ? this.updateUser:  this.createUser } className="btn text-light  float-right mt-3">
                      {this.state.isUpdate ? "Update" : "Submit"} 
                </button>
              </div>
            </div>
      </div>
    );
  }
}