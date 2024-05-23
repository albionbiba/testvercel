"use client";
import React, { useState } from "react";
import { AvailableTime, WFDatePicker } from "./date_picker.tsx";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./stylesheet.css";
import Popup from "reactjs-popup";
import icon from "../images/water.png";
import { waitForDebugger } from "inspector";

interface Referencee {
  name: string;
  surname: string;
}

interface Address {
  city: string;
  street: string;
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
  referal: Referencee;
  phone: string;
  address: Address;
  profession: string;
  comment: string;
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
    referal: {
      name: "Jari",
      surname: "Boby",
    },
    phone: "+355683456728",
    address: {
      city: "Tirane",
      street: "Rr. Shallvareve",
    },
    profession: "Developer",
    comment: "",
    outcome: null,
    successfulDateTimeCall: null,
  },
  {
    id: "2",
    reference: {
      name: "Juna",
      surname: "Findiku",
    },
    referal: {
      name: "Mona",
      surname: "Lisa",
    },
    phone: "+355683493461",
    address: {
      city: "Tirane",
      street: "Kinostudio",
    },
    profession: "Jr. Developer",
    comment: "Hello from Juna",
    outcome: Outcome.excessiveArgument,
    successfulDateTimeCall: null,
  },
];

export function References() {
  const [currReferences, updateCurrReferences] =
    useState<Reference[]>(sampleReferences);
  const [referenceComment, setActiveComment] = useState<Reference | null>(null);
  const [referenceOutcome, setActiveOutcome] = useState<Reference | null>(null);

  function CommentBlock() {
    if (referenceComment == null) {
      return <div></div>;
    }
    return (
      <div className="comment">
        <span >
          {referenceComment.comment == "" || referenceComment.comment == null
            ? "Nothing to show"
            : referenceComment.comment}
        </span>
        <button onClick={() => setActiveComment(null)}>X</button>
      </div>
    );
  }

  interface CommentButtonProps {
    onCommentSelect: () => void;
  }
  const CommentButton: React.FC<CommentButtonProps> = ({ onCommentSelect }) => {
    return (
      <div>
        <button className="idk" onClick={() => onCommentSelect()}>Show comment</button>
      </div>
    );
  };
  
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

      // Update reference on backen here
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
        <td>
          {ref.referal.name} {ref.referal.surname}
        </td>
        <td>{ref.phone}</td>
        <td>
          {ref.address.city} {ref.address.street}
        </td>
        <td>{ref.profession}</td>
        <td>
          <CommentButton onCommentSelect={() => setActiveComment(ref)} />
        </td>
        <td>
          <OutcomeEditor reference={ref}></OutcomeEditor>
        </td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Referral</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Profession</th>
            <th>Comments</th>
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
    <div className="ref-body">
      <nav>
        <img src={icon} alt="img-water" style={{ marginRight: "30px" }} />
        <section>
          <a href="Home" style={{ color: "#000", textDecoration: "none" }}>
            Home
          </a>
          <span
            style={{
              textDecoration: "underline solid black 2px",
              color: "#000",
            }}
          >
            References
          </span>
          <a
            href="make_calls"
            style={{ color: "#000", textDecoration: "none" }}
          >
            Make calls
          </a>
          <a href="reserved" style={{ color: "#000", textDecoration: "none" }}>
            Reserved
          </a>
        </section>

        <div>
          <p className="span--text">Phone agent</p>
        </div>
      </nav>
      <h1>References</h1>
      <ReferencesTable references={currReferences} />
      <CommentBlock />
      <OutcomeBlock />
    </div>
  );
}
