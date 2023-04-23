import "./App.css";
import SendEmail from "./SendEmail";
import Upload from "./Upload";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/send" element={<SendEmail />} />
        </Routes>
      </Router>
      {/* <Upload /> */}
    </>
  );
}

export default App;
