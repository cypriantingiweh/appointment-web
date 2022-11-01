import axios from "axios";
 
const baseURL= "http://localhost:8080/api";

class AppointmentDataService {
  getAll() {
    return axios.get(baseURL+"/appointment");
  }

  get(id) {
    return axios.get(`${baseURL}/appointment/${id}`);
  }

  create(data){
   return axios.post(baseURL+"/appointment", data,   {headers: {
        'Content-Type': 'application/json',
      }},)
}

  update(data) {
    return axios.put(baseURL+`/appointment/update`, data);
  }

}

export default new AppointmentDataService();