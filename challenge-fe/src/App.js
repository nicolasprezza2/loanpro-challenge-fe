import Login from "./components/Login/Login";
import './App.css'
import Calculator from "./components/Calculator/Calculator";
import MyRecords from "./components/MyRecords/MyRecords";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader/AppHeader";
import { Container } from "react-bootstrap";
import LogOut from "./components/Login/Logout";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Container>
          <div className="mainContent"> 
            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="/calculator" element={<Calculator/>}/>
              <Route exact path="/myRecords" element={<MyRecords/>}/>
              <Route exact path="/logout" element={<LogOut/>}/>
              <Route path="*" element={<Login/>}/>
            </Routes>
          </div>
      </Container>
     </div> 
  );
}

export default App;
