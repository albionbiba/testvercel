import * as React from "react";
import RefTable from "./ReferencesOverviewTable.tsx";

function RefWithTable() {
  return (
    <div className="flex flex-col py-6 bg-gray-400 bg-opacity-70 rounded-[30px] text-neutral-500">
      <div className="flex gap-2 self-end px-5 py-2 mr-28 text-sm bg-white  rounded-[30px] max-md:mr-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f557b5858815fb499c561fb9db2cff444aa79035ba382b95ccad43a57fbdc2b?"
          className="shrink-0 aspect-square fill-neutral-500 w-[17px]"
        />
<input placeholder='Search' className="flex-auto" />
      </div>
      <div className="ml-10 mr-10 mt-10 mb-0">
      <RefTable />
      </div>
      <div className="flex flex-col items-start px-16 mt-5 w-full text-sm max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 items-start mt-6 max-md:flex-wrap">
            <button>
                <div className="flex flex-1 gap-4 mt-1.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/583e3f9088ec4f681dbdd48cd87845868e286fe0b9d94382c5406b7405743d88?"
              className="shrink-0 w-6 aspect-square"
            />
            <div className="flex-auto my-auto">
              Remove from<span className="font-bold"> References</span>
            </div>
          </div>
            </button>
        </div>
      </div>
    </div>
  );
}
export default RefWithTable;
