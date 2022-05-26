import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories";
import Articles from "./pages/Articles";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Categories />} />
        <Route path="/editarticles" element={<Articles />} />
      </Routes>
    </Router>
  );
}

export default App;
