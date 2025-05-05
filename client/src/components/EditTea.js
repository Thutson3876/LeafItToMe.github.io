import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/teas";

async function getTea(teaId) {
   const response = await fetch(`${apiEndpoint}/${teaId}`);
   if (response.ok) {
      return response.json();
   }
   else {
      console.log(response);
      return null;
   }
}

async function editTea(teaId, teaPart) {
   const response = await fetch(`${apiEndpoint}/${teaId}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(teaPart),
   })
   if (response.ok) {
      return response.body;
   }
   else {
      console.log(response);
      return null;
   }
}

function EditTea() {
   const { teaId } = useParams();
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({ name: "", type: "", desc: "", rating: 1 });

   function handleChange(name, value) {
      setInputs(values => ({ ...values, [name]: value }));
   }

   async function handleSubmit(event) {
      event.preventDefault();

      const teaPart = {
         name: inputs.name,
         type: inputs.type,
         desc: inputs.desc,
         rating: inputs.rating
      };

      await editTea(teaId, teaPart);
      goBack();
   }

   function goBack() {
      navigate("/teas");
   }

   useEffect(() => {
      async function loadTea() {
         const tea = await getTea(teaId);
         setInputs({ 
            name: tea.name,
            type: tea.type,
            desc: tea.desc,
            rating: tea.rating
         });
      }

      loadTea();
   }, [teaId]);

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
            Save
         </Button>
         <Button variant="secondary" type="button" onClick={goBack}>
            Cancel
         </Button>
      </Form>
   );
}

export default EditTea;