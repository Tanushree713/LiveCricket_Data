// Api.js
const API_Key = "57e7e57d-4364-443c-8a63-3f3e6f77e7aa";

export const Getdata = () => {
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API_Key}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR fetching matches:", err));
};

export const GetMatchdetails = (id) => {
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API_Key}&unique_id=${id}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR fetching match details:", err));
};
