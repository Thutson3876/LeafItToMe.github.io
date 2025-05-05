import { Button, Card, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";

function Tea(props) {
   const tea = props.value;
   const deleteTea = props.delete;
   const editRoute = `/edit/${tea._id}`;
   const addTea = props.add;

   return (
      <Card className="mb-3">
         <Card.Header>
            <h4>{tea.name}</h4>
            
         </Card.Header>
         <Card.Body>
            <CloseButton className="float-end"
               onClick={() => deleteTea(tea._id)} />
            <Link to={editRoute} className="float-end"><h5>&#x270E;</h5></Link>
            <Button className="btn-sm float-end" 
               onClick={() => addTea(tea._id)}>&#x2605;</Button>
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