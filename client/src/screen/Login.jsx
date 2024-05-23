import "../css/Login.css";
import React, {useState} from "react";
import waterIcon from "../images/water.png"
import axios from "axios";
export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [failedMessage, setFailedMessage] = useState(null);

  const togglePassVisibility = () => {
    let pass = document.getElementById("password");
    if(pass.type === 'password'){
      pass.type = "text";
    }else{
      pass.type = "password";
    }
  }
  
  const login = () => {
    setFailedMessage(null);
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
  
    axios.post("http://localhost:5000/login", formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    })
    .then(response => {
      console.log(response.data);
      //console.log(response.data.user.roleId.title);
      setStatus(response.data.status); 
      if (response.data.user.roleId.title === "marketingManager") {
        window.location.href = "/overview";
      }else if(response.data.user.roleId.title === "phoneAgent"){
        window.location.href = "/reservedCalls";
    }else if(response.data.user.roleId.title === "salesAgent"){
        window.location.href = "/salesAgentDashboard";
        // console.log(response.data);
    }})
    .catch(error => {
      setFailedMessage(error.response.statusText);
      console.error("Error logging in:", error.response);
    });
  }
  

  return (
    <div className="login-container">
      <div className="login">
        <div className="sub-login">
          <div className="login-welcome">
            <div className="aqua-co flex flex-row justify-center items-center pb-12">
              <img src={waterIcon} alt="water-icon"/>
              <p className="text-white font-bold text-center">Aqua.Co</p>
            </div>
            <div className="horizontal-line">
            </div>
            <p className="text-lg text-white font-light">Welcome back!</p>
          </div>
        </div>
        {/* <form method="post"> */}
        <div className="login-form">
        <div className="login-elements gap-y-5 flex flex-col justify-center">
        <p className="text-lg font-bold">Log in</p>

          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="username"/>
          <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="current-password"/>
          <div className="flex flex-row items-center">
          <input type="checkbox" onClick={togglePassVisibility}/>
          <p>Show password</p>
          </div>
          <button className="login-btn text-white" onClick={login}>Login</button>
          {failedMessage && <p className="text-red-700 font-bold text-center bg-red-200 p-2 ">{failedMessage}</p>}
        </div>
      
        </div>
      {/* </form> */}
      </div>
    </div>
  )
}