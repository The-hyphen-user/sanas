import React, { useState, useEffect } from "react";
import "../App.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); //array of strings
  const [searchResults, setSearchResults] = useState([]); //array of strings that fit search query

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let resp = await fetch("http://localhost:3000/data.txt");
    let textData = await resp.text();
    setData(textData.split("\n"));
  };

  const getSearchResults = () => {
    setSearchResults(
      data.filter((line) =>
        line
          .split(/[",. ]+/)
          .some((word) => word.toLowerCase() == query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h3>Search</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={getSearchResults}>search</button>
      <br />
      <div className="simple-border">
        <h2>Search Results</h2>
        {searchResults.map((line) => (
          <div>{line}</div>
        ))}
      </div>
      <div className="simple-border">
        <h2>All Data</h2>
        {data.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default Search;
