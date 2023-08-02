// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { Getdata } from "./Api";
import Navbar from "./Navbar";
import Card from "./MyCard" ;
import ReactPaginate from "react-paginate";

function App() {
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Number of matches to display per page

  useEffect(() => {
    Getdata()
      .then((data) => {
        setMatches(data.data);
      })
      .catch((err) => alert("Couldn't Load Page"));
  }, []);


  const pageCount = Math.ceil(matches.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentMatches = matches.slice(offset, offset + itemsPerPage);

  return (
    <>
      <Navbar/>
      {currentMatches.length > 0 ? (
        currentMatches.map((match) => <Card key={match.id} match={match} />)
      ) : (
        <p>No matches available</p>
      )}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
}

export default App;