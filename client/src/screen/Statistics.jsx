import Header from "../components/CallsHeader";
import "../css/Statistics.css";
import BasicBars from "../components/BarChart";
import BasicPie from "../components/PieChart";
export default function Statistics(){
    return(
        <div className="stat-container">
          <div className="reserved-calls">
          {/* <div className="reserved-calls-header"> */}
            <Header
            links={[
              { path: "#", text: "Home" },
              { path: "/reservedCalls", text: "Reserved" },
              { path: "#", text: "Schedules" },
              { path: "/statistics", text: "Statistics" },
              { path: "/ref", text: "Ref" },
              { path: "/redList", text: "Red List" },
              { path: "/ref", text: "Buyers & Ref" },
            ]}
            />
            {/* </div> */}
          </div>
          <div className="sub-container">
            <p className="text-lg font-bold">Statistics</p>
            <p className="text-sm">&nbsp;&nbsp;&nbsp;&nbsp;Phone Agent</p>
            <div className="sub-sub-container flex flex-row items-center">
            <BasicBars/>
            <BasicPie/>
          </div>
          </div>
        </div>
    )
}