import React from "react";
import { createContext, useContext, useState } from "react";

export const SearchAllContext = createContext();
export const useSearchAll = () => useContext(SearchAllContext);

export const SearchAllProvider = (props) => {
  const [searchAllParam, setSearchAllParam] = useState("");
  const [matchingEles, setMatchingEles] = useState([]);

  return (
    <SearchAllContext.Provider
      value={{ searchAllParam, setSearchAllParam, matchingEles, setMatchingEles }}
    >
      {props.children}
    </SearchAllContext.Provider>
  );
};

export default SearchAllProvider;
