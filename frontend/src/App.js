import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../src/page/Singup/Signup";
import Signin from "./page/Signin/Signin";
import Navbar from "./components/Navbar";
import Addjob from "./page/Addjob/Addjob";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/addjob" element={<Addjob />} />
      </Routes>
    </Router>
  );
}

export default App;
