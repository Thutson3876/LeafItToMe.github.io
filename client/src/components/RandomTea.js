import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Suggestion from "./Suggestion";

const apiEndpoint = "http://localhost:8000/api/users/teas";

function getToken() {
    const token = localStorage.getItem("token");
 
    return token;
   }

async function getRandomTea(){
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
        console.log(teas);
        const tea = teas[Math.floor(Math.random()*teas.length)];
        console.log("Chosen tea: " + teas.name);
        return tea;
    }
    catch(err){
        console.log("ERROR");
        console.log(err);
        return null;
    }
}

function RandomTea() {
   const [tea, setTea] = useState({name:"", type:"", desc:"", rating:1 });
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      async function getATea() {
         const foundTea = await getRandomTea();
         if(foundTea == null){
            console.log("Teas is null!");
            navigate("/login");
            return;
         }
         else
            console.log(foundTea);

         setTea(foundTea);
         setIsLoading(false);
      }

      getATea();
   }, []);

   return (
      <>
         {isLoading
            ? (
               <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
               </Spinner>
            ) : 
               <Suggestion key={tea._id} value={tea} />
         }
      </>
   );
}

export default RandomTea;