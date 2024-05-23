import { useEffect, useState } from "react";
import Header from "../components/CallsHeader";
import ReservedCallsTable from "../components/ReservedCallsTable";
import "../css/ReservedCalls.css";
import axios from "axios";
import left from "../images/left.png";
import right from "../images/right.png";

function ReserveCallsPhoneAg() {
  const [reservedCalls, setReservedCalls] = useState([]);
  const [phoneNums, setPhoneNums] = useState([]);
  const [phoneNo, setPhoneNo] = useState("");
  const [date, setDate] = useState("");
  const [agent, setAgent] = useState("");
  const [phoneAgent, setPhoneAgent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReservedCalls = async (page, limit) => {
    axios
      .get(`http://localhost:5000/fetchReservedCalls?page=${page}&limit=${limit}`)
      .then((response) => {
        console.log(response.data);
        setReservedCalls(response.data.reservedCalls);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPhoneAgents = async () => {
    axios.get("http://localhost:5000/fetchPhoneAgents")
    .then((response) => {
      console.log(response.data);
      setAgent(response.data.phoneAgents);
    })
    .catch((error) => {
      console.log(error);
    }); 
  }

  const fetchPhoneNums = async () => {
    axios
      .get("http://localhost:5000/fetchNums")
      .then((response) => {
        console.log(response.data);
        setPhoneNums(response.data.phoneNums);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reservePhoneCall = async () => {
    axios
      .post("http://localhost:5000/reserveCalls", {
        phoneNo: phoneNo,
        date: date,
        agent: phoneAgent,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearFields = () => {
    console.log("Clearing fields");
    setPhoneAgent("");
    setPhoneNo("");
    setDate("");

    document.getElementById('phoneNums').selectedIndex = 0;
    document.getElementById('phoneAgents').selectedIndex = 0;
  }

  useEffect(() => {
    fetchReservedCalls(currentPage, 5);
    fetchPhoneNums();
    fetchPhoneAgents();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const links = [
    { path: "#", text: "Home" },
    { path: "/reservedCalls", text: "Reserved" },
    { path: "#", text: "Schedules" },
    { path: "/statistics", text: "Statistics" },
    { path: "#", text: "Ref" },
    { path: "/redList", text: "Red List" },
    { path: "/ref", text: "Buyers & Ref" },
  ];

  return (
    <div className="reserved-calls-container">
      <div className="reserved-calls">
        <div className="reserved-calls-header">
          <Header
          links={links}
          />
        </div>
      </div>
      <div className="reserved-phone-calls">
        <div className="flex jusitfy-center flex-col p-5">
          <p className="font-bold text-xl">Reserved Phone Calls</p>
          <p>Add Call</p>
        </div>

        <div className="p-container flex justify-between">
        <div className="dd">

          <ReservedCallsTable reservedCalls={reservedCalls} />

          <div className="pagination flex items-center justify-center">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <img src={left} alt="left" />
              </button>
              <span>{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <img src={right} alt="right" />
              </button>
            </div>
        </div>
          <div className="phone-form">
            <p className="font-light">Insert</p>
            <p>Phone Number</p>

            <div className="form-elements flex flex-col gap-y-3">

              <select
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                name="phoneNums"
                id="phoneNums"
                onChange={(e) => setPhoneNo(e.target.value)}
              >
                <option value="">Select Phone Number</option>
                {phoneNums.length>0 && phoneNums?.map((phone, index) => (
                  <option key={index} value={phone.number}>
                    {phone.number}
                  </option>
                ))}
              </select>

              <input
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date & Time"
              />

              <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              name="phoneAgents" id="phoneAgents"
              onChange={(e) => setPhoneAgent(e.target.value)}>
              <option value="">Select an agent</option>
              {agent.length>0 && agent?.map((a, index) => (
                  <option key={index} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="btns flex flex-col mt-6 gap-y-3">
              <button className="sbm-btn text-white" onClick={reservePhoneCall}>
                Submit
              </button>
              <button className="bg-white text-black p-1 rounded-md" onClick={clearFields}>Clear Fields</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveCallsPhoneAg;
