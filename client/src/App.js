import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import TeaList from "./components/TeaList";
import AddTea from "./components/AddTea";
import EditTea from "./components/EditTea";
import RandomTea from "./components/RandomTea";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import UserTeas from "./components/UserTeas";

import "./custom-bootstrap.css";
import "./App.css";

import {
   Routes,
   Route
 } from 'react-router-dom';
//<Container className="mt-3">
function App() {

  return (
     <>
      <Header />

      <Container className="mt-3">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/teas" element={<TeaList />} />
               <Route path="/add" element={<AddTea />} /> 
               <Route path="/my-teas" element={<UserTeas />} />
               <Route path="/suggestion" element={<RandomTea />} />
               <Route path="/edit/:teaId" element={<EditTea />} />     
            </Routes> 

      </Container>
       
     
     </>
      
  );
}

export default App;
