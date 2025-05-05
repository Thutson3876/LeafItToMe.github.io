import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import UserTea from "./UserTea";

const apiEndpoint = "http://localhost:8000/api/users/teas";

function getToken() {
    const token = localStorage.getItem("token");
 
    return token;
}

async function getTeas(){
    console.log("Fetching user teas...");
    try{
        const token = getToken();
        if(!token){
            console.log("TOKEN IS NULL");
            return null;
        }

        const response = await fetch(apiEndpoint, {
            headers: { "X-Auth": getToken() }
        });

        const teas = await response.json();
        console.log("Teas found: ");
        console.log(teas);
        return teas;
    }
    catch(err){
        console.log("ERROR");
        console.log(err);
        return null;
    }
}

async function deleteTea(teaId) {
    const response = await fetch(`${apiEndpoint}/${teaId}`, {
       method: "DELETE",
       headers: { "X-Auth": getToken() }
    });
    if (response.ok) {
       return response.body;
    }
    else {
       console.log(response);
       return null;
    }
}

async function addToUserList(teaId){
    const response = await fetch(`${apiEndpoint}/${teaId}`, {
        method: "PUT",
        headers: { "X-Auth": getToken() }
     });
     if (response.ok) {
        return response.body;
     }
     else {
        console.log(response);
        return null;
     }
}

function UserTeas() {
    const [teas, setTeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
 
    function deleteFromList(teaId) {
        // Delete tea from database
        deleteTea(teaId);
  
        // Delete tea from tea list
        setTeas(prevTeas => prevTeas.filter(
           tea => tea._id != teaId));
     }

    useEffect(() => {
       async function getAllTeas() {
          const foundTeas = await getTeas();
          if(!foundTeas || foundTeas.error) {
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
          <h2>My Teas</h2>
          <br></br>
          {isLoading
             ? (
                <Spinner animation="border" role="status">
                   <span className="visually-hidden">Loading...</span>
                </Spinner>
             ) : 
             teas.map(tea => (
                <UserTea key={tea._id} value={tea}
                   delete={deleteFromList} add={addToUserList} />
             ))
          }
          <br></br>
          <Button className="float-start" href="/suggestion">Suggestion</Button>
          <Button className="float-end" href="/teas">Grow Collection</Button>
          <br></br>
          <br></br>
       </>
    );
 }
 
 export default UserTeas;