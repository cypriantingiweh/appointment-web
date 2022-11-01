import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from "react-router-dom";
import AppointmentsList from "./components/appointments/appointment-list.component";
import BookAppointment from "./components/appointments/book-appointment.component";
import './App.css'

class App extends Component {
  render() {
    return (
      <div>

        <div className="row row-design">
          <nav className="navbar col-md-4 navbar-expand backgound">
              <a href="/appointment" className="backgound navbar-brand">
               <h3>DrNG  &nbsp; &nbsp;|</h3> 
              </a>
              <div className=" navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/appointment"} className=" text-light nav-link">
                    <h4>Patients</h4> 
                  </Link>
                </li>
              </div>
            </nav>

          <nav className="navbar col-md-12 navbar-expand bg-dark">
          </nav>
        </div>

      <br /><br />

        <div className="mt-5 contain">
          <Routes>
            <Route path="/" element={<AppointmentsList/>} />
            <Route path="/appointment" element={<AppointmentsList/>} />
            <Route path="/add" element={<BookAppointment />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;