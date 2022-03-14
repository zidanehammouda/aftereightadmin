import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Categories from './admin/Categories';
import Articles from './admin/Articles';
import Navbar from './admin/Navbar';


function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/aftereightadmin" element={<Categories/>}/>
        <Route path="/aftereightadmin/editarticles" element={<Articles/>}/>
      </Routes>
    </Router>
  );
}




export default App;