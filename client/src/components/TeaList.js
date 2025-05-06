import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Tea from "./Tea";
import { useNavigate } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
import CustomAlert from "./CustomAlert";

const teasApiEndpoint = "http://localhost:8000/api/teas";
const usersApiEndpoint = "http://localhost:8000/api/users/teas";

function getToken() {
   const token = localStorage.getItem("token");

   return token;
  }

async function getTeas() {
   console.log("Fetching teas...");
   const response = await fetch(teasApiEndpoint);
   if (response.ok) {
      console.log("OK.");
      return response.json();        
   }
   else {
      console.log(response);
      return null;
   }
}

async function searchTeas(name) {
   console.log("Fetching teas...");
   const response = await fetch(`${teasApiEndpoint}/search/${name}`);
   if (response.ok) {
      console.log("OK.");
      return response.json();        
   }
   else {
      console.log(response);
      return null;
   }
}

async function addTea(teaId){
   const response = await fetch(`${usersApiEndpoint}/${teaId}`, {
      method: "PUT",
      headers: { "X-Auth": getToken() }
   });
   if (response.ok) {
      return response;
   }
   else {
      console.log(response);
      return null;
   }
}

async function deleteTea(teaId) {
   const response = await fetch(`${teasApiEndpoint}/${teaId}`, {
      method: "DELETE"
   });
   if (response.ok) {
      return response.body;
   }
   else {
      console.log(response);
      return null;
   }
}

function TeaList() {
   const [teas, setTeas] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [currentTea, setCurrentTea] = useState({ });
   const [inputs, setInputs] = useState({ name: "" })
   const navigate = useNavigate();

   function handleChange(name, value) {
      setInputs(values => ({ ...values, [name]: value }));
   }

   async function handleSubmit(event) {
      event.preventDefault();

      if(!inputs.name || inputs.name.trim()){
         console.log("name was null in search!");
         const foundTeas = await getTeas();
         if(foundTeas == null){
            console.log("Teas is null!");
            navigate("/login");
            return;
         }
            
         else
            console.log(foundTeas);

         setTeas(foundTeas);
      }

      const newTeas = await searchTeas(inputs.name);
      if(!newTeas || newTeas.error){
         console.log("an error occurred.");
         return;
      }

      setTeas(newTeas);
   }

   function deleteFromList(teaId) {
      // Delete tea from database
      deleteTea(teaId);

      // Delete tea from tea list
      setTeas(prevTeas => prevTeas.filter(
         tea => tea._id !== teaId));
   }

   async function addTeaToUser(teaId) {
      const response = await addTea(teaId);
      if(response == null){
         setCurrentTea({
            message: "That tea is already in your collection.",
            status:"danger"
         });

         return;
      }
   
      var result = await response.json();
      console.log(result);
      if(result.error){
         setCurrentTea({
            message: "That tea is already in your collection.",
            status:"danger"
         });

         return;
      }

      const teaName = result[0].name;
      setCurrentTea({
         message: `Successfully added ${teaName} to your collection!`,
         status: "success"
      });
   }

   useEffect(() => {
      async function getAllTeas() {
         const foundTeas = await getTeas();
         if(foundTeas == null){
            console.log("Teas is null!");
            navigate("/login");
            return;
         }
            
         else
            console.log(foundTeas);

         setTeas(foundTeas);
         setIsLoading(false);
      }

      getAllTeas();
   }, []);

   return (
      <>
      <h1>Communal Teas</h1>
      <br></br>

      <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="name">
            <Form.Label>Find by Name</Form.Label>
            <Form.Control type="text"
               value={inputs.name} className="align-self-stretch"
               onChange={(e) => handleChange("name", e.target.value)} />
         </Form.Group>
         <Button variant="primary" type="submit" className="me-2">
            Search
         </Button>
      </Form>

      <hr />
         {currentTea.message && 
            <Alert key={currentTea.status} variant={currentTea.status}>
               {currentTea.message}
            </Alert>
         }
         {isLoading
            ? (
               <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
               </Spinner>
            ) : 
               teas.map(tea => (
               <Tea key={tea._id} value={tea}
                  delete={deleteFromList} add={addTeaToUser} />
            ))
         }

         <Button className="float-start" href="/add">Add</Button>
         <br></br>
         <br></br>
         
      </>
   );
}

export default TeaList;