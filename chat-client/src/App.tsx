import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Registration/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
