import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../src/page/Singup/Signup";
import Signin from "./page/Signin/Signin";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
