import React, { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ToggleModeContext from "../../../contexts/ToggleModeContext";
import "./ToggleMode.css";

function ToggleModeButtons() {
  const { toggleMode, setToggleMode } = useContext(ToggleModeContext);

  function changeModeToGrid() {
    setToggleMode(true);
  }
  function changeModeToList() {
    setToggleMode(false);
  }

  return (
    <div className="toggleMode_main">
      <button type="button" onClick={changeModeToGrid}>
        <BsFillGridFill color={toggleMode ? "blue" : "var(--light-color)"} />
      </button>
      <button type="button" onClick={changeModeToList}>
        <FaThList color={!toggleMode ? "blue" : "var(--light-color)"} />
      </button>
    </div>
  );
}

export default ToggleModeButtons;
