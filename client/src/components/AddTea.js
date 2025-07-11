import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/teas";

function getToken() {
    const token = localStorage.getItem("token");
 
    return token;
}

async function addTea(tea) {
   const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(tea),
   })
   if (response.ok) {
      return response.body;       
   }
   else {
      console.log(response);
      return null;
   }
}

function AddTea() {
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({ name: "", type: "", desc: "", rating: 1 });

   useEffect(() => {
          async function teaCheck() {
             const token = getToken();
             if(!token) {
                console.log("Token is null!");
                navigate("/login");
                return;
             }
          }

          teaCheck();
       }, []);

   function handleChange(name, value) {
      setInputs(values => ({ ...values, [name]: value }));
   }

   async function handleSubmit(event) {
      event.preventDefault();

      const tea = {
         name: inputs.name,
         type: inputs.type,
         desc: inputs.desc,
         rating: inputs.rating
      };


      await addTea(tea);
      goNext();
   }

   function goBack() {
      navigate("/");
   }

   function goNext(){
      navigate("/teas");
   }

   return (
      <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="name">
            <Form.Label>Tea Name</Form.Label>
            <Form.Control type="text"
               value={inputs.name}
               onChange={(e) => handleChange("name", e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text"
               value={inputs.type}
               onChange={(e) => handleChange("type", e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
               value={inputs.desc}
               onChange={(e) => handleChange("desc", e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number"
               value={inputs.rating}
               onChange={(e) => handleChange("rating", e.target.value)} />
         </Form.Group>
         <Button variant="primary" type="submit" className="me-2">
            Add
         </Button>
         <Button variant="secondary" type="button" onClick={goBack}>
            Cancel
         </Button>
      </Form>            
   );
}

export default AddTea;