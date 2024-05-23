import * as React from "react"; 
import MarketingManager_Dashboard from "../components/MarketingManager_Dashboard.tsx";
import RefWithTable from "../components/ReferencesOverview_bottomPage.tsx";


function MM_RefOverview() {
  return (
    <div className="p-10" style={{ background: 'linear-gradient(122.69deg, #01061C 53.82%, rgba(0, 44, 101, 0.76) 77.73%, #01061C 96.54%)' }}>
    <div className="flex flex-col pb-20 bg-blue-200 rounded-[50px]">
     
      <div>
        <MarketingManager_Dashboard />
      </div>
      <div className="text-3xl ml-20 mt-10 mb-5 font-light text-black max-w-[297px]">
      Reference Overview
    </div>
     
      <div className="pl-20 pr-20 pt-10 pb-20">
      <RefWithTable />

      </div>
      </div>
          </div>
  );
}

export default MM_RefOverview;


