import waterImage from "../images/water.png";
import "../css/CallsHeader.css";
import { Link } from "react-router-dom";
export default function SalesAgentHeading() {
  return (
    <div className="header py-1 rounded-lg" style={{backgroundColor: '#DCE2E9'}}>
      <img src={waterImage} alt="water" width={'50px'} />
      <Link to="#" className="font-bold text-blue-800">Home</Link>
      <Link to="#" className="font-bold text-blue-800">Meetings</Link>
      <Link to="/availableHours" className="font-bold text-blue-800">Schedule</Link>
    </div>
  );
}