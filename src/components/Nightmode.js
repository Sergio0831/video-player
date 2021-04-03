import React from "react";
import StyledNightmode from "../components/styles/StyledNightmode";

const Nightmode = ({ nightMode, nightModeCallback }) => (
  <StyledNightmode>
    <span>Nightmode: </span>
    <label htmlFor='checkbox' className='switch'>
      <input
        type='checkbox'
        checked={nightMode}
        onChange={nightModeCallback}
        id='checkbox'
      />
      <span className='slider round' />
    </label>
  </StyledNightmode>
);

export default Nightmode;
