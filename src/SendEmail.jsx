import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCopy } from "react-icons/ai";
import logo from "./assets/zz.png";
import Loader from "./Loader";

const SendEmail = () => {
  const location = useLocation();
  let downloadLink = location?.state?.downloadLink; // Updated with optional chaining
  let uuid = location?.state?.uuid; // Updated with optional chaining
  const [isCopied, setIsCopied] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendPostRequest = async () => {
    setIsLoading(true);
    const url = "https://fileshareapp-ckxt.onrender.com/api/send";
    const data = {
      uuid,
      emailFrom: senderEmail,
      emailTo: receiverEmail,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send POST request");
      }

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // remove copied message after 2 seconds
  };

  return (
    <>
      <div className="card">
        <div className="logo">
          <img className="logoImg" src={logo} alt="" />
          <h1 className="" style={{ color: "rgb(5, 5, 125)" }}>
            inShare!
          </h1>
        </div>
        <h2>Congrats! your file is ready to Share</h2>
        <div>
          <h4 style={{ color: "purple" }}>
            {downloadLink}{" "}
            <AiOutlineCopy onClick={handleCopy} style={{ fontSize: "20px" }} />
            <p>{isCopied && "Link copied!"}</p>
          </h4>

          <p style={{ color: "gray" }}>Copy the link or share via Email</p>
        </div>

        <div className="login-box">
          <div className="form">
            <div className="user-box">
              <label>Sender email : </label>
              <input
                type="email"
                name="sender-email"
                value={senderEmail}
                class="input"
                required
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="example@gmail.com "
              />
            </div>
            <div className="user-box">
              <label>Recipient email : </label>

              <input
                type="email"
                name="recipient-email"
                value={receiverEmail}
                placeholder="example@gmail.com "
                class="input"
                required
                onChange={(e) => setReceiverEmail(e.target.value)}
              />
            </div>

            {/* {error && <div className="error">{error}</div>} */}
            <center>
              <button
                className="downloadBtn"
                style={{ color: "purple" }}
                onClick={sendPostRequest}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Send Email"}
              </button>
            </center>
          </div>
        </div>

        <br />
        {/* <p>
          <a href="/">Back</a>
        </p> */}
      </div>
    </>
  );
};

export default SendEmail;
