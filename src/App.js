import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditCategory from "./pages/EditCategory";
import Login from "./pages/Login";
import Navbar from "./componenets/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/editcategory" element={<EditCategory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
