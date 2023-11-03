import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../src/page/Singup/Signup";
import Signin from "./page/Signin/Signin";
import Addjob from "./page/Addjob/Addjob";
import Homepage from "./page/Homepage/Homepage";
import Jobdetails from "./page/Jobdetails/Jobdetails";
import Editjob from "./page/Editjob/Editjob";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/addjob" element={<Addjob />} />
        <Route path="/jobdetails/:id" element={<Jobdetails />} />
        <Route path="/editjob/:id" element={<Editjob />} />
      </Routes>
    </Router>
  );
}

export default App;
