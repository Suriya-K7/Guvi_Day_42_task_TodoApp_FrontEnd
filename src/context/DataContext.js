import { createContext, useEffect, useRef, useState } from "react";
import Api from "../api/Api";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};

export default DataContext;
