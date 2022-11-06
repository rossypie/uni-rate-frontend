import axios from "axios";
import React from "react";

const HealthCheck = () => {
  const [token, setToken] = React.useState(localStorage.getItem('auth_token'))

  React.useEffect(() => {
    axios
    .get('/api/university/health-check/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then((res)=>{
      if(res.status == 200){
      }
    })
    .catch((e)=>{
      if(e.response.status == 401)
        localStorage.removeItem('auth_token');
    })
  },[]);


  return (
    null
  );
}
 
export default HealthCheck;