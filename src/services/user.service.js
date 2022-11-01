import axios from "axios";
 const baseURL= "http://localhost:8080/api";

class UserDataService {
  getAll() {
    return axios.get(baseURL+"/users");
  }

create(data){
  return  axios.post(baseURL+"/signup", data,   {headers: {
        'Content-Type': 'application/json',
      }},);
}

  login(data){
    axios.post(baseURL+"/login", data,   {headers: {
        'Content-Type': 'application/json',
      }},);

}
 update(data) {
    return axios.put(baseURL+`/user/update`, data);
  }
}

export default new UserDataService();