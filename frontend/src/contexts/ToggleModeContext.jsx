import { createContext, useState, useMemo } from "react";

const ToggleModeContext = createContext();
export default ToggleModeContext;

export function ToggleModeProvider({ children }) {
  const [toggleMode, setToggleMode] = useState(false);
  const contextObject = useMemo(
    () => ({ toggleMode, setToggleMode }),
    [toggleMode, setToggleMode]
  );
  return (
    <ToggleModeContext.Provider value={contextObject}>
      {children}
    </ToggleModeContext.Provider>
  );
}
