import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories";
import Articles from "./pages/Articles";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route exact path="aftereightadmin" element={<Categories />} />
        <Route path="aftereightadmin/editarticles" element={<Articles />} />
      </Routes>
    </Router>
  );
}

export default App;
