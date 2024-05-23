import React from "react";

function RefTableRow({ name, surname, referralName, city, street, phoneNumber, jobPosition, company, date }: any) {
  return (
    <div className="mt-10 ml-10 mr-10 pt-1 pb-1 flex gap-5 pr-7 pl-3.5 bg-white rounded-md max-md:flex-wrap max-md:pr-5 mb-5 mt-10">
      <div className="flex gap-2 items-center mt-1 text-base text-sky-950">
        <input type="checkbox" className="self-stretch my-auto mr-10 mt-5" />
        <div className="self-stretch my-auto">
          {name} <br />
          {surname}
        </div>
        <div className="shrink-0 self-stretch w-px bg-indigo-500 border border-indigo-500 border-dashed h-[61px]" />
        <div className="self-stretch my-auto">
          <span className="font-light text-indigo-500">Referral :</span>
          <br />
          <span className="text-sm">{referralName}</span>
        </div>
      </div>
      <div className="flex flex-auto gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col my-auto text-base">
          <div className="font-light text-indigo-500">
            <span className="text-indigo-500">{city}, {street}</span>{" "}
          </div>
          <div className="mt-4 text-sky-950">{phoneNumber}</div>
        </div>
        <div className="my-auto text-base text-indigo-500">
          {jobPosition}
          <br />
          in <span className="font-light text-indigo-500">{company}</span>
        </div>
        <div className="justify-center items-start px-4 py-2.5 text-sm bg-gray-100 rounded-xl max-w-[138px] text-neutral-500">
      <span className="font-bold">Status:</span>
      <br />
      Successful
    </div>
        <button>
        <div className="justify-center items-start px-4 py-2.5 text-sm bg-gray-100 rounded-xl max-w-[138px] text-neutral-500">
      <span className="font-bold">Call History</span>
    </div>
        </button>
      </div>
    </div>
  );
}

export default RefTableRow;
