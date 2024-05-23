import Scheduler from "./Scheduler";
import "../css/SalesAgentDashboard.css"
import SalesAgentHeading from "../components/SalesAgentHeading";
import profile from "../images/profile.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import axios from "axios";

export default function SalesAgentDashboard(){

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="sale-big-dash">
    <div className="sale-dash">
    <SalesAgentHeading />

    <div className="flex flex-row mt-6 p-6">
    <div className="scheduler-container" style={{ height: '400px', margin: 'auto', overflowY: 'scroll'}}>
      <Scheduler />
    </div>
      <div style={{flex:2}} className="flex flex-col justify-center items-center">
        <img src={profile} alt="profile"/>
        <h1 className="font-bold text-lg">Sales Agent</h1>
        <div className="flex flex-row items-center justify-center">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <button onClick={handleSignOut} className="ml-1 text-sm font-medium ">Sign out</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}