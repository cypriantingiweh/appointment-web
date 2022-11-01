import React from "react";
import AppointmentTableRow from "./appointmentTableRow";

export default class AppointmentTable extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      appointment:[],
      sorting:false
    }

    this.sortArray = this.sortArray.bind(this)
  }


   sortArray = async(type) => {
   const strAscending = await [...this.props.appointment]
    if(type === 'user.age'){
        strAscending.sort((a, b) =>parseInt(`${a}.${type}`) - parseInt(`${b}.${type}`))
    }else{
         strAscending.sort((a, b) =>
    `${a}.${type}` > `${b}.${type}` ? 1 : -1 );
    } 
    this.setState({
      appointment:strAscending,
      sorting:true
    })
  };

  render() {
    const filterText = this.props.filterText;
    const rows = []; 
   if(!this.state.sorting) {
        this.props.appointment.forEach((appointment) => {
      if (
        appointment.appointment_code.indexOf(filterText) === -1 && 
        appointment.user.names.indexOf(filterText) === -1 &&
        appointment.user.email.indexOf(filterText) === -1 && 
        appointment.user.phone.indexOf(filterText) === -1 && 
        appointment.appointment_date.indexOf(filterText) === -1 && 
        appointment.appointment_time.indexOf(filterText) === -1 && 
        appointment.status.indexOf(filterText) === -1 &&
        appointment.user.city.indexOf(filterText) === -1 &&
        appointment.user.address.indexOf(filterText) === -1

        ) {
        return;
      }     
      rows.push(
        <AppointmentTableRow
          appointment={appointment}
          key={appointment.appointment_code}
        />
      );
    });
    
  }else{
    console.log(this.state.appointment)
      this.state.appointment.forEach((appointment) => {
      if (
        appointment.appointment_code.indexOf(filterText) === -1 && 
        appointment.user.names.indexOf(filterText) === -1 &&
        appointment.user.email.indexOf(filterText) === -1 && 
        appointment.user.phone.indexOf(filterText) === -1 && 
        appointment.appointment_date.indexOf(filterText) === -1 && 
        appointment.appointment_time.indexOf(filterText) === -1 && 
        appointment.status.indexOf(filterText) === -1 &&
        appointment.user.city.indexOf(filterText) === -1 &&
        appointment.user.address.indexOf(filterText) === -1

        ) {
        return;
      }     
      rows.push(
        <AppointmentTableRow
          appointment={appointment}
          key={appointment.appointment_code}
        />
      );
    });
  }

    return (
      <div className="col">
            <div className="row">
            <div style={{cursor:'pointer'}} className="col-2 thRow icon-sort" onClick={()=> this.sortArray("user.names")} >Names <span><i className="icon-chevron-down"></i> <i className="icon-chevron-up"></i> </span> </div>
            <div style={{cursor:'pointer'}} className="col-1 thRow  icon-sort" onClick={()=>  this.sortArray("appointment_code")}>Code</div>
            <div style={{cursor:'pointer'}} className="col-2 thRow icon-sort" onClick={()=>  this.sortArray("user.email")}>Email</div>
            <div style={{cursor:'pointer'}} className="col-agetime thRow icon-sort" onClick={()=>  this.sortArray("user.age")}>Age</div>
            <div style={{cursor:'pointer'}} className="col-1 thRow icon-sort" onClick={()=>  this.sortArray("user.phone")}>Phone</div>
            <div style={{cursor:'pointer'}} className="col-1 thRow icon-sort" onClick={()=>  this.sortArray("user.city")}>City</div>
            <div style={{cursor:'pointer'}} className="col-1 thRow icon-sort"onClick={()=>  this.sortArray("user.address")}>Address</div>
            <div style={{cursor:'pointer'}} className="col-1 thRow icon-sort" onClick={ ()=> this.sortArray("appointment_date")}>Date</div>
            <div style={{cursor:'pointer'}} className="col-agetime thRow icon-sort" onClick={ ()=> this.sortArray("appointment_time")}>Time</div>
            <div style={{cursor:'pointer'}} className="col-1 thRow icon-sort" onClick={() => this.sortArray("Status")}>Status</div>
          </div>
           { rows}
      </div>
    );
  }
}