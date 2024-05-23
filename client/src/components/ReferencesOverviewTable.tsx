import React from "react";
import RLTableRow from "./redlistTableRow.tsx";
import RefTableRow from "../screen/TabRowRef.tsx";

function RefTable() {
    
  return (
    
    <div className="rounded-[15px]" style={{ backgroundColor: "#E5E7EB",  maxHeight: "500px", overflowY: "auto" }}>
      <RefTableRow
        name="John"
        surname="Doe"
        referralName="Jane"
        city="New York"
        street="123 Main St"
        phoneNumber="123-456-7890"
        jobPosition="Engineer"
        company="Tech Inc."
      />
      <div style={{ marginBottom: "15px" }}></div>
      <RefTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
      />
      <RefTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
      />
      <RefTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
      />
      <RefTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
      />
      <RefTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
      />
     
      {/* Add more RLTableRow components here */}
    </div>
  );
}

export default RefTable;
