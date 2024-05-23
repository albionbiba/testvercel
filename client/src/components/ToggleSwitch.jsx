import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

function ToggleSwitch({ onToggle }) {
  const [checked, setChecked] = useState(true);

  const handleChange = val => {
    setChecked(val);
    console.log('Toggle state in ToggleSwitch:', val);
    onToggle(val); 
  }

  return (
    <div className="app" style={{textAlign: "center"}}>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
        height={20}
        width={40}
        handleDiameter={20}
      />
    </div>
  );
}

export default ToggleSwitch;
