import React, { useState } from "react";
// import profilePic from '../images/marketingManagerProfile.png';
// import logo from '../images/water.png';
import CallsHeader from "./CallsHeader.jsx";
import "../css/CallsHeader.css";

function MarketingManager_Dashboard() {
  // State to track which button is clicked
  // const [clickedButtons, setClickedButtons] = useState({
  //   1: false,
  //   2: false,
  //   3: false,
  //   4: false,
  //   5: false,
  //   6: false,
  //   7: false,
  // });

  // Function to handle button click
  // const handleButtonClick = (buttonNumber: number) => {
  //   setClickedButtons((prevClickedButtons) => ({
  //     ...prevClickedButtons,
  //     [buttonNumber]: !prevClickedButtons[buttonNumber],
  //   }));
  // };
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
    <div className=" py-10 pr-5 pl-20 bg-white bg-opacity-40 max-md:px-5" style={{borderTopLeftRadius:'50px', borderTopRightRadius:'50px'}}>
      <div className="">
        {/* <img
          loading="lazy"
          src={logo}
          className="shrink-0 aspect-square w-[76px]"
          alt="Logo"
        /> */}
        <CallsHeader 
        links={links}/>
        {/* <div className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
          <div className="flex gap-5 mt-6 text-xl text-neutral-500 max-md:flex-wrap max-md:mt-10">
            <button
              className={clickedButtons[1] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(1)}
            >
              <div className="my-auto">
                <span className="text-neutral-500">Home</span>{" "}
              </div>
            </button>
            <button
              className={clickedButtons[2] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(2)}
            >
              <div className="text-center">
                Reserved <br />
              </div>
            </button>
            <button
              className={clickedButtons[3] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(3)}
            >
              <div className="my-auto">
                <span className="text-neutral-500">Schedules</span>{" "}
              </div>
            </button>
            <button
              className={clickedButtons[4] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(4)}
            >
              <div className="my-auto">
                <span className="text-neutral-500">Statistics</span>{" "}
              </div>
            </button>
            <button
              className={clickedButtons[5] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(5)}
            >
              <div className="my-auto">
                <span className="text-neutral-500">References</span>{" "}
              </div>
            </button>
            <button
              className={clickedButtons[6] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(6)}
            >
              <div className="my-auto">
                <span className="text-neutral-500">Red List</span>{" "}
              </div>
            </button>
            <button
              className={clickedButtons[7] ? "text-sky-950" : ""}
              onClick={() => handleButtonClick(7)}
            >
              <div className="my-auto">
                <span className="text-neutral-500">Buyers & Ref</span>{" "}
              </div>
            </button>
          </div>
        </div> */}
        {/* <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-2.5 text-lg text-right text-neutral-500 max-md:mt-10">
            <div className="my-auto">
              <span className="text-base font-bold text-black">Irma Muka</span>
              <br />
              <span className="text-sm font-medium text-neutral-500">
                Marketing Manager
              </span>
            </div>
            <img
              loading="lazy"
              src={profilePic}
              className="shrink-0 aspect-square w-[76px]"
              alt="Profile Pic"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default MarketingManager_Dashboard;
