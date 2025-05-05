import { Alert } from "react-bootstrap";
import { useState } from "react";

function CustomAlert(props) {
   const [show, setShow] = useState(false);
   const teaName = props.value.name;
   console.log(teaName);
   if(teaName && teaName != "")
    setShow(true);

   /*if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Added {teaName}!</Alert.Heading>
        <p>
          {teaName} has been added to your personal collection.
        </p>
      </Alert>
    );
  }*/

   return (
      <>
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Added {teaName}!</Alert.Heading>
        <p>
          {teaName} has been added to your personal collection.
        </p>
      </Alert>
      </>
   );
}

export default CustomAlert;