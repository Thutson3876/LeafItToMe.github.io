import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/users/login";

async function loginUser(user) {
    console.log("logging in....");
   const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   });

   const json = await response.json();

   if (response.ok) {
      // Return the JWT
      return json.token;      
   }
   else {
      console.log(response);
      return null;
   }
}

function Login() {
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({ username: "", password: "" });
   const [errors, setErrors] = useState({ });

   function handleChange(name, value) {
      setInputs(values => ({ ...values, [name]: value }));
   }

   const validateForm = (data) => {
      const errors = {};

      if (!data.username.trim()) {
          errors.username = 'Username is required';
      }

      if (!data.password) {
          errors.password = 'Password is required';
      }

      return errors;
  };

   async function handleSubmit(event) {
      event.preventDefault();
      const newErrors = validateForm(inputs);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted successfully!');
      } else {
            console.log('Form submission failed due to validation errors.');
            return;
      }

      const user = {
         username: inputs.username,
         password: inputs.password,
         teas: []
      };

      try {
        // Attempt to login and get back JWT
        const token = await loginUser(user);

        if(token == null || token.error){
         var failedErrors = errors;
        failedErrors.failed = "Login attempt failed.";
        setErrors(failedErrors);
         return;
        }
  
        //console.log("Token: " + token);
  
        // Store for later requests
        localStorage.setItem("token", token);
  
        goNext();
     }
     catch (err) {
        console.log(err);
        var failedErrors = newErrors;
        failedErrors.failed = "Login attempt failed.";
        setErrors(failedErrors);
     }
   }

   function goNext() {
    navigate("/suggestion");
   }

   return (
    <>
        <h1>Login</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"
                value={inputs.username}
                onChange={(e) => handleChange("username", e.target.value)} />
                {errors.username && (
                        <span className="text-danger">
                            {errors.username}
                        </span>
                    )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                value={inputs.password}
                onChange={(e) => handleChange("password", e.target.value)} />
                {errors.password && (
                        <span className="text-danger">
                            {errors.password}
                        </span>
                    )}
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">
                Login
            </Button>
            <br />
            {errors.failed && (
                        <span className="text-danger">
                            {errors.failed}
                        </span>
                    )}
        </Form> 
    </>
               
   );
}

export default Login;