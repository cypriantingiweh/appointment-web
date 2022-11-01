import React from "react";
import { Link } from "react-router-dom";

export default class AppointmentTableRow extends React.Component {

   constructor(props) {

    super(props);

    this.navigateToEdit = this.navigateToEdit.bind(this);
  }


 navigateToEdit= (appointment) =>{ 
  localStorage.setItem("appointMent",JSON.stringify(appointment));
 }     

  render() {
     const {
     id,appointment_code,status,appointment_date,appointment_time,user,
     
    } = this.props.appointment;

    const {names,email,phone,age, city,address} = user;

    return (
           <div className="row dataRow" key={appointment_code}>
            <div className="col-2 thRow">{names}</div>
            <div className="col-1 thRow">{appointment_code}</div>
            <div className="col-2 thRow">{email}</div>
            <div className="col-agetime thRow"> {age}</div>
            <div className="col-1 thRow">{phone}</div>
            <div className="col-1 thRow">{city}</div>
            <div className="col-1 thRow">{address}</div>
            <div className="col-1 thRow">{appointment_date}</div>
            <div className="col-agetime thRow">{appointment_time}</div>
            <div className="col-1 thRow">
              
              {status ==="PENDING" ?<Link to={"/add"} style={{ textDecoration: 'none' }}  onClick={()=>this.navigateToEdit(this.props.appointment)}  className="text-primary status-pending">{status}</Link>:(<></>) }
              {status ==="MISSED" ? <Link to={"/add"} style={{ textDecoration: 'none' }} onClick={()=>this.navigateToEdit(this.props.appointment)}  className="text-danger status-missed"><Link to={`/add`} /> {status}</Link>:(<></>) }
              {status ==="PASSED" ? <Link to={"/add"}  style={{ textDecoration: 'none' }} onClick={()=>this.navigateToEdit(this.props.appointment)}  className="text-success status-passed"> {status}</Link>:(<></>) }
              {status ==="RESHEDULE" ? <Link to={"/add"} style={{ textDecoration: 'none' }} onClick={()=>this.navigateToEdit(this.props.appointment)}  className="text-warning status-reshedule"> {status}</Link>:(<></>) }
               
             </div>
          </div>
    );
  }
}

