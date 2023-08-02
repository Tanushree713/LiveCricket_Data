import React, { useState } from "react";
import { GetMatchdetails } from "./Api";

function Card({ match }) {
  const [details, setDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  function handleclick(id) {
    GetMatchdetails(id)
      .then((data) => {
        console.log("match details" ,data);
        setDetails(data);
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  }

  function handleClose() {
    setShowModal(false);
  }

  function getmatchCard() {
  if (!match || !match.teams || !match.dateTimeGMT) {
    // If match data is missing or incomplete, do not render the card
    return null;
  }

  const isMatchEnded = match.matchEnded;
  const isMatchStarted = match.matchStarted;

  return (
    <>
    <div className="container mt-3">
      <div className="card mb-3">
        <div className="card-body">
        {match.matchType === "t20" ? (
          <p className="card-text" style={{ fontSize: "16px",fontWeight: "bold",color: "#555"}}>Type: T20</p>
        ) : match.matchType === "odi" ? (
          <p className="card-text" style={{ fontSize: "16px",fontWeight: "bold",color: "#555"}}>Type: ODI</p>
        ) :  (
          <p className="card-text" style={{ fontSize: "16px",fontWeight: "bold",color: "#555"}}>Type: Test</p>
        ) }
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
              <h3>{match.teams[0]}</h3>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
              {match.teamInfo && match.teamInfo[0] && (
                <>
                  <img src={match.teamInfo[0].img} alt={match.teams[0]} width="48" />
                  <span className="mx-2">VS</span>
                  <img src={match.teamInfo[1].img} alt={match.teams[1]} width="48" />
                </>
              )}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
              <h3>{match.teams[1]}</h3>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button className="btn btn-primary" onClick={() => handleclick(match.id)}>
            Show details
          </button>
          <button className="btn btn-primary ml-3"  style={{marginLeft:"2rem"}}>
            Start-Time {new Date(match.dateTimeGMT).toLocaleString()}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Match Details..</h5>
                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {isMatchEnded ? (
                  <p>Status: {match.status}</p>
                ) : isMatchStarted ? (
                  <>
                    <p>
                      Score: {match.score.reduce((total, current) => total + current.r, 0)} /{" "}
                      {match.score.reduce((total, current) => total + current.w, 0)}
                    </p>
                    <p>
                      Innings: {match.score[0].inning}
                    </p>
                    <p>
                      Overs: {match.score[0].o}
                    </p>
                  </>
                ) : (
                  <p>Status: Not started</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

    

   
  return (
    <>
      {getmatchCard()}
    </>
     );
}

export default Card;
