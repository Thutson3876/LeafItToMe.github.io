const Tea = require("../models/tea");
const router = require("express").Router();

// Get list of all teas
router.get("/", async function(req, res) {
   console.log("Attempting to FIND..."); 
   try{
      const teas = await Tea.find({});
      console.log("Found!");
      if(teas == null)
         console.log("Teas is null!");

      res.status(200).json(teas);
   }
   catch(err){
      console.log("an error occurred.");
      res.status(400).send(err);
   }
});

// Get list of all teas by name
router.get("/search/:name", async function(req, res) {
   console.log("Attempting to FIND by name..."); 
   const name = req.params.name;
   console.log("name to search: " + name);

   

   try{
      const teas = await Tea.find({ name: {$regex : name, $options: 'i'} });
      console.log("Found!");
      if(teas == null)
         console.log("Teas is null!");

      res.status(200).json(teas);
   }
   catch(err){
      console.log("an error occurred.");
      res.status(400).send(err);
   }
});

// Get a tea with an ID
router.get("/:id", async function(req, res) {
   console.log("Attempting to FIND by ID..."); 
   try{
      const tea = await Tea.findById(req.params.id);
      console.log("Found!");
      if (tea === null) {
         res.sendStatus(404);
      }
      else {
         console.log(tea);
         res.status(200).json(tea);
      }

   }
   catch(err){
      res.status(400).send(err);
   }
});

// Add a new tea to the database
router.post("/", function(req, res) {
   const tea = new Tea(req.body);
   console.log("Attempting to ADD Tea..."); 
   console.log(tea);
   try{
      tea.save().then(function (result) {
         console.log("added!");
         res.status(201).json(result);
       });
   }
   catch(err){
      console.log("ERROR");
      res.status(400).send(err);
   }
});

// Update an existing tea
router.put("/:id", function(req, res) {
   console.log("Attempting to UPDATE Tea..."); 
   const teaPart = req.body;
   try{
      Tea.updateOne({ _id: req.params.id }, teaPart, { runValidators: true })
         .then(function (result) {
            console.log("Updated!");
            if (result.matchedCount === 0) {
               res.sendStatus(404);
            } 
            else {
               res.sendStatus(204);
            }
         });
   }
   catch(err){
      console.log("ERROR");
      res.status(400).send(err);
   }
});

// Delete a tea with an ID
router.delete("/:id", function(req, res) {
   console.log("Attempting to DELETE Tea..."); 
   try{
      Tea.deleteOne({ _id: req.params.id })
         .then(function (result) {
            console.log("deleted!");
            if (result.matchedCount === 0) {
               res.sendStatus(404);
            } 
            else {
               res.sendStatus(204);
            }
         });
   }
   catch(err){
      console.log("ERROR");
      res.status(400).send(err);
   }
   
});

module.exports = router;