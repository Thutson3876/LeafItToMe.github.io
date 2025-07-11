const apiEndpoint = "http://localhost:8000/api/teas";

async function getTeas() {
   const response = await fetch(apiEndpoint);
   if (response.ok) {
      return response.json();        
   }
   else {
      console.log(response);
      return null;
   }
}

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

async function deleteTea(teaId) {
   const response = await fetch(`${apiEndpoint}/${teaId}`, {
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

export default {      
   getTeas,
   getTea,
   addTea,
   editTea,
   deleteTea
};