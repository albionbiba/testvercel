import React from "react";
import RLTableRow from "./redlistTableRow.tsx";

function SampleTable() {
    
  return (
    
    <div className="rounded-[15px]" style={{ backgroundColor: "#E5E7EB",  maxHeight: "400px", overflowY: "auto" }}>
      <RLTableRow
        name="John"
        surname="Doe"
        referralName="Jane"
        city="New York"
        street="123 Main St"
        phoneNumber="123-456-7890"
        jobPosition="Engineer"
        company="Tech Inc."
        date="01/01/2023"
      />
      <div style={{ marginBottom: "15px" }}></div>
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      <RLTableRow
        name="Alice"
        surname="Smith"
        referralName="Bob"
        city="Los Angeles"
        street="456 Elm St"
        phoneNumber="987-654-3210"
        jobPosition="Designer"
        company="Design Co."
        date="02/02/2023"
      />
      {/* Add more RLTableRow components here */}
    </div>
  );
}

export default SampleTable;
