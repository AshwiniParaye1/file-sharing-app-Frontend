import { useRef, useState, useEffect } from "react";
import logo from "./assets/zz.png";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Do something with the selected file
    console.log("Selected file:", file);
  };

  // Use a ref to access the file input element
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true); // Set loading state to true

      const response = await fetch(
        "https://fileshareapp-ckxt.onrender.com/api/uploads/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (data) {
        navigate("/send", { state: data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false after the request is finished
    }
  };

  console.log("files >>>>> ", selectedFile);

  return (
    <>
      <div className="card">
        <div className="logo">
          <img className="logoImg" src={logo} alt="" />
          <h1 className="" style={{ color: "rgb(5, 5, 125)" }}>
            inShare!
          </h1>
        </div>
        <h2 style={{ color: "purple", marginBottom: "60px" }}>
          Share files effortlessly with just a few clicks.
        </h2>

        <div>
          {/* File input hidden by default */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {/* Button as file input */}
          <button
            style={{
              color: "purple",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
            onClick={handleFileButtonClick}
          >
            Click to upload your files here!
          </button>
          {/* Display selected file name */}
          {selectedFile && (
            <div>
              <p style={{ color: "gray" }}>File Uploaded Successfully!</p>
              <button
                className="getDownloadBtn"
                style={{
                  color: "purple",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
                onClick={handleSubmit}
              >
                {/* Display a loader if loading state is true */}
                {loading ? <Loader /> : "Get Download Link"}
              </button>
            </div>
          )}
        </div>
        {/* <SendEmail /> */}
      </div>
    </>
  );
};

export default Upload;
