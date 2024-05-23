"use client";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import React,{ useState } from "react";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { AvailableTime, WFDatePicker } from "./date_picker.tsx";
import Popup from "reactjs-popup";

interface Referencee {
    name: string;
    surname: string;
  }
  enum Outcome {
    noAnswer = "No answer",
    callLater = "Call later",
    excessiveArgument = "Excessive argument",
    successful = "Successful",
  }
  
  interface Reference {
    id: string;
    reference: Referencee;
    phone: string;
    category: string;
    outcome: Outcome | null;
    successfulDateTimeCall: AvailableTime | null;
  }
  
  const sampleReferences: Reference[] = [
    {
      id: "1",
      reference: {
        name: "Julind",
        surname: "Mara",
      },
      phone: "+355683456728",
      category: "reserved",
      outcome: null,
      successfulDateTimeCall: null,
    },
    {
      id: "2",
      reference: {
        name: "Juna",
        surname: "Findiku",
      },
      phone: "+355683493461",
      category: "red list",
      outcome: Outcome.excessiveArgument,
      successfulDateTimeCall: null,
    },
  ];

  export function ReservedPhoneCalls() {
    const [currReferences, updateCurrReferences] =
      useState<Reference[]>(sampleReferences);
    const [referenceOutcome, setActiveOutcome] = useState<Reference | null>(null);
    
    const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(
        null
      );
      const [showDateSelection, setShowDateSelection] = useState<boolean>(false);
    
      function OutcomeBlock() {
      if (referenceOutcome == null) {
        return <div></div>;
      }
      function handleSubmit() {
        if (selectedOutcome == null || referenceOutcome == null) return;
  
        if (selectedOutcome == Outcome.successful) {
          setShowDateSelection(true);
          return;
        }
  
        // Update reference on backend here
        // For now we fake it
        referenceOutcome.outcome = selectedOutcome;
        updateCurrReferences(currReferences);
        setActiveOutcome(null);
      }
  
      const optionsDisplay = Object.entries(Outcome).map(([oKey, oValue]) => {
        return (
          <label key={oKey}>
            <input
              type="radio"
              value={oKey}
              checked={selectedOutcome == oValue}
              onChange={(_) => setSelectedOutcome(oValue)}
            />
            {oValue}
          </label>
        );
      });
  
      const optionSubmitButton =
        selectedOutcome == null ? (
          <span></span>
        ) : (
          <button onClick={handleSubmit}> Submit</button>
        );
  
      const datePopup = (
        <Popup
          modal
          open={showDateSelection}
          onClose={() => setShowDateSelection(false)}
        >
          <WFDatePicker
            onDateTimeAvailableSubmit={(result) => {
              // Again faking it here
              referenceOutcome.outcome = Outcome.successful;
              referenceOutcome.successfulDateTimeCall = result;
              updateCurrReferences(currReferences);
              setActiveOutcome(null);
            }}
          ></WFDatePicker>
        </Popup>
      );
  
      return [optionsDisplay, optionSubmitButton, datePopup];
    }
  
    interface OutcomeEditorProps {
      reference: Reference;
    }
    const OutcomeEditor: React.FC<OutcomeEditorProps> = ({ reference }) => {
      if (reference.outcome == null) {
        return (
          <OutcomeButton onOutcomeSelect={() => setActiveOutcome(reference)} />
        );
      }
  
      const successCallDate =
        reference.successfulDateTimeCall == null ? (
          <span></span>
        ) : (
          <div>
            <span>
              {new Date(
                reference.successfulDateTimeCall.startTime
              ).toLocaleTimeString()}
            </span>
            until
            <span>
              {new Date(
                reference.successfulDateTimeCall.endTime
              ).toLocaleTimeString()}
            </span>
          </div>
        );
      return (
        <div>
          <span>{reference.outcome}</span>
          {successCallDate}
        </div>
      );
    };
  
    interface ReferencesTableProps {
      references: Reference[];
    }
    const ReferencesTable: React.FC<ReferencesTableProps> = ({ references }) => {
      const rows = references.map((ref) => (
        <tr key={"element" + ref.id}>
          <td>
            {ref.reference.name} {ref.reference.surname}
          </td>
          <td>{ref.phone}</td>
          <td>{ref.category}</td>
          <td>
            <OutcomeEditor reference={ref}></OutcomeEditor>
          </td>
        </tr>
      ));
  
      return (
        <table>
          <thead>
            <tr>
              <th>Name Surname</th>
              <th>Phone number</th>
              <th>Category</th>
              <th>Call Outcome</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    };
  
    interface OutcomeProps {
      onOutcomeSelect: () => void;
    }
    const OutcomeButton: React.FC<OutcomeProps> = ({ onOutcomeSelect }) => {
      return (
        <div>
          <button onClick={() => onOutcomeSelect()}>Update call outcome</button>
        </div>
      );
    };
  
    return (
      <div>
        <nav>
          <img src="icon.png" style={{ marginRight: "30px" }} />
          <section>
            <a href="Home" style={{ color: "#000", textDecoration: "none" }}>
              Home
            </a>
            <a href="references" style={{ color: "#000", textDecoration: "none" }}>
              References
            </a>
            <a
              href="make_calls"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Make calls
            </a>
            <span
              style={{
                textDecoration: "underline solid black 2px",
                color: "#000",
              }}
            >
              Reserved
            </span>
          </section>
  
          <div>
            <p className="span--text">Phone agent</p>
          </div>
        </nav>
        <h1>References</h1>
        <ReferencesTable references={currReferences} />
        <OutcomeBlock />
      </div>
    );
  }