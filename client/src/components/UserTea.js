import { Card, CloseButton } from "react-bootstrap";

function Tea(props) {
   const tea = props.value;
   const deleteTea = props.delete;

   return (
      <Card className="mb-3">
         <Card.Header>
         <h4>{tea.name}</h4>
         </Card.Header>
         <Card.Body>
            <CloseButton className="float-end"
               onClick={() => deleteTea(tea._id)} />

            {tea.desc}
         </Card.Body>
         <Card.Footer>
            Type: {tea.type} 
            <span className="float-end">Rating: {tea.rating}</span>
         </Card.Footer>
      </Card>
   );
}

export default Tea;