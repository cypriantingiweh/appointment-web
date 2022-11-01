import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppointmentDataService from "../../services/appointment.service";
import Pagination from "react-js-pagination";
import SearchBar from "../SearchBar";
import AppointmentTable from "./appointmentTable";

const DATA_PER_PAGE = 3;


export default class AppointmentsList extends Component {
  constructor(props) {
     super(props);

    this.retrieveAppointments = this.retrieveAppointments.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.calculateStatistics = this.calculateStatistics.bind(this);


    this.state = {
      appointments: [],
      filterText: '',
      missed:0,
      resheduled:0,
      passed:0,
      pending:0,
      activePage: 1,
    };
  }

  componentDidMount() {
    this.retrieveAppointments();
  }

  retrieveAppointments() {
    AppointmentDataService.getAll()
      .then(response => {

        this.setState({
          appointments: response.data
        });

          this.calculateStatistics(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }


  calculateStatistics(appointment){
        appointment.map(appointment =>{
          switch(appointment.status) {
            case 'PENDING':
              return this.setState({pending:++this.state.pending });
            case 'MISSED':
              return this.setState({missed:++this.state.missed });
            case 'RESHEDULE':
              return this.setState({resheduled:++this.state.resheduled +1});
            default:
              return this.setState({passed:++this.state.passed});
          }
        })
  }

 handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

   handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    const indexOfLastData = this.state.activePage * DATA_PER_PAGE;
    const indexOfFirstData = indexOfLastData - DATA_PER_PAGE;
    const data = this.state.appointments.slice(indexOfFirstData, indexOfLastData);
  
    return (   
    <div className="plasceholder" >
      <div className="row">
        <div className="col-1"></div>        
        <div className="col-10">
          <div className="row">
                <div className="col-md-3">
                  <h4 className="appontment_list">Appointments List</h4>
                  <div className="line"></div>
                </div>
                <div className="col-md-5"></div>
                <div className="col-md-3">
                  <SearchBar
                  filterText={this.state.filterText}
                  onFilterTextChange={this.handleFilterTextChange}/>
                </div>
            </div>

          <div className="row row-center">
                <div className="missed box p-5 col-3"> 
                  <div className="col-12"> Missed</div>
                  <div className="col-12 text-danger"><h1> {this.state.missed < 10 ? <span>0</span>:null}{this.state.missed} </h1> </div>
                </div>
                <div className="reshedule box p-5 col-3"> 
                  <div className="col-12"> Reshedule</div>
                  <div className="col-12 text-warning"><h1>{this.state.resheduled < 10 ? <span>0</span>:null}{this.state.resheduled} </h1></div>
                </div>
                <div className="passed box p-5 col-3"> 
                  <div className="col-12"> Passed</div>
                  <div className="col-12 text-success "> <h1>{this.state.passed < 10 ? <span>0</span>:null}{this.state.passed} </h1></div>
                </div>
                <div className="pending box p-5 col-3"> 
                  <div className="col-12"> Pending</div>
                  <div className="col-12 text-primary "> <h1>{this.state.pending < 10 ? <span>0</span>:null}{this.state.pending} </h1></div>
                </div>
            </div>
        </div>
        <div className="col-1"></div>
      </div>
      <AppointmentTable
              appointment={data}
              filterText={this.state.filterText}
            />
      <div className="row">
              <div className="col-md-4 col-sm-12"></div>
              <div className="col-md-7 col-sm-12 pagination">
                 <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    className="pagination"
                    activePage={this.state.activePage}
                    itemsCountPerPage={DATA_PER_PAGE}
                    totalItemsCount={this.state.appointments.length}
                    pageRangeDisplayed={this.state.appointments.length/DATA_PER_PAGE}
                    onChange={this.handlePageChange.bind(this)}
                  />
              </div>
                <div className="col-md-1 col-sm-12">
                  <Link to={"/add"} className="btn icon-plus">
                    
                  </Link>
                </div>

            </div>
    </div>
    
    );
  }
}


