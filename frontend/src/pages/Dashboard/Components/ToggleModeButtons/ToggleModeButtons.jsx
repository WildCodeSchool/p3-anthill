import React, { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import "./ToggleModeButtons.css";

function ToggleModeButtons() {
  const { toggleMode, setToggleMode } = useContext(ToggleModeContext);

  function changeModeToGrid() {
    setToggleMode(false);
  }
  function changeModeToList() {
    setToggleMode(true);
  }

  return (
    <div className="toggleMode_main">
      <button
        type="button"
        className="toggle-button"
        onClick={changeModeToGrid}
      >
        <BsFillGridFill
          className="toggle-icon"
          color={!toggleMode ? "var(--small-touch)" : "var(--light-color)"}
        />
      </button>
      <button
        type="button"
        className="toggle-button"
        onClick={changeModeToList}
      >
        <FaThList
          className="toggle-icon"
          color={toggleMode ? "var(--small-touch)" : "var(--light-color)"}
        />
      </button>
    </div>
  );
}

export default ToggleModeButtons;
