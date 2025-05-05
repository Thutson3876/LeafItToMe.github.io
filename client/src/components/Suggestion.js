import { Button, Card, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";

function Tea(props) {
   const tea = props.value;

   return (
    <>
    <h1>Fresh Suggestion</h1>
    <br></br>
      <Card>
          <Card.Body>
            <Card.Title>
              <h3>{tea.name}</h3>
            </Card.Title>
            <Card.Text>
              {tea.desc}
            </Card.Text>
            
            <Card.Footer>
            Type: {tea.type} 
            <span className="float-end">Rating: {tea.rating}</span>
            </Card.Footer>
            <br></br>
            <Button variant="primary" href="/my-teas">View in Collection</Button>
          </Card.Body>
        </Card>
    </>
      
   );
}

export default Tea;