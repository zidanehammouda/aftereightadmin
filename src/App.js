import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditCategory from "./pages/EditCategory/EditCategory";
import Login from "./pages/Login/Login";
import Navbar from "./componenets/Navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
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
