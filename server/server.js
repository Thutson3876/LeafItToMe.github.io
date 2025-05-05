const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
 
const app = express();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());
 
// Shows HTTP requests in the console
app.use(morgan("dev"));
  
// CORS to allow requests from any origin
app.use(cors());

/*app.use("/api/teas", function (req, res, next) {
    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
       return res.status(401).json(
          { error: "Missing X-Auth header" });
    }
 
    next();
 });*/

// Create endpoint http://localhost:8000/api/teas
app.use("/api/teas", require("./api/teas"));
app.use("/api/users", require("./api/users"));

const port = 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;