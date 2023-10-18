import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "../src/page/Registration/Registration";
import Signin from "./page/Signin/Signin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
