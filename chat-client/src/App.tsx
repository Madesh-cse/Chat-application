import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
