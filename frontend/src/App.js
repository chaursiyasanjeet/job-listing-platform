import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../src/page/Singup/Signup";
import Signin from "./page/Signin/Signin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
