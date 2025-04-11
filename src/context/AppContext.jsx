import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [dataStructure, setDataStructure] = useState("");

  const value = {
    dataStructure,
    setDataStructure
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
