const router = require("express").Router();
const User = require("../models/user");
const Tea = require("../models/tea");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// For encoding/decoding JWT
const secretKey = process.env.JWT_PRIVATE_KEY;

async function validateUser(req){
   try {
      // X-Auth should contain the token 
      console.log("fetching auth...");
      const token = req.headers["x-auth"];
      const decoded = jwt.decode(token, secretKey);

      console.log("finding the one...");

      // Send back all _id, username, and status fields
      const user = await User.findOne({ username: decoded.username });

      if(user){
         console.log("User found: " + user.username);
      }

      return user;
   }
   catch(err){
      console.log("User not validated");
      return;
      //console.log(err);
   }
}

// Sends a token when given valid username/password
router.post("/login", async function (req, res) {

    console.log("attempting login...");
   if(!req.body.username || !req.body.password){
      res.status(401).json({ "error": "Missing username and/or password" });
      return;
   }
   let user;
   try{
      user = await User.findOne({ username: req.body.username });
      if(!user){
         res.status(401).json({ "error": "Bad username" });
         return;
      }
   }
   catch(err){
      console.log(err);
      res.status(401).json({ "error": "Bad username" });
      return;
   }
   console.log("attempting bcrypt...");
   try{
      if(bcrypt.compareSync(req.body.password,user.password)){
         let token = jwt.encode({username:req.body.username}, secretKey);
         res.json({token:token});
         return;
      }
      else{
         res.status(401).json({ "error":"Bad password" });
         return;
      }
   }
   catch(err){
      console.log(err);
      res.status(401).json({ "error": "Bad password" });
      return;
   }
});

// Adds a new user to the database
router.post("/", async function (req, res) {

    console.log("attempting to create user...");
    console.log("vvv User below vvv");
    console.log(req.body);
   if (!req.body.username || !req.body.password) {
      res.status(418).json({ "error": "Missing username and/or password" });
      return;
   }

   try{
      let user = await User.findOne({ username: req.body.username });
      if(user){
        res.status(418).json({ "error": "Username taken" });
        return;
      }

      const pass = bcrypt.hashSync(req.body.password, 10);

      const item = new User({
         username: req.body.username,
         password: pass,
         teas: []
      });
      let result = await item.save();
      console.log("result: " + result);
      let token = jwt.encode({ username: item.username }, secretKey);

      res.status(201).json({ token: token });
   }
   catch(err){
      console.error(err);
      res.status(418).json({ error: "Internal server error" });
   }
   
});

router.get("/teas", async function (req, res) {
    try {
       const user = await validateUser(req);
       if(!user){
         res.status(401).json({ "error": "user not validated" });
         return;
       }

       var teas = user.teas;
       console.log("teas found... checking length");
       if(teas.length == 0){
        console.log("populating...");
        teas = await Tea.find({});
        user.teas = teas;
        console.log("updating...");
        User.updateOne({ _id: user._id }, {
            username: user.username,
            password: user.password,
            teas: teas
        }, { runValidators: true }).then(function (result) {
            
            if (result.matchedCount === 0) {
                console.log("Updated!");
            }
            else{
                console.log("couldn't update user's teas");
            }
         });
       }
       console.log("teas found fully!");
       console.log(teas);
       res.status(201).json(teas);
    }
    catch (err) {
        console.log(err);
       res.status(401).json({ error: err.message });
    }
 });

 router.get("/teas/:type", async function(req, res) {
    console.log("Attempting to FIND by Type..."); 
    try{
      const user = await validateUser(req);
      if(!user){
        res.status(401).json({ "error": "User not validated" });
        return;
      }

      const teas = await User.find(
         {
           username: user.username,
           "teas.type": req.params.type
         });

       if (teas === null) {
          res.sendStatus(404);
       }
       else {
          console.log(teas);
          res.status(201).json(teas);
       }
 
    }
    catch(err){
       res.status(400).send(err);
    }
 });

 // Delete a tea with an ID
router.delete("/teas/:id", async function(req, res) {
    console.log("Attempting to DELETE Tea..."); 
    try{
      const user = await validateUser(req);
      if(!user){
        res.status(401).json({ "error": "User not validated" });
        return;
      }

      const teaId = req.params.id;
      user.teas = user.teas.filter(element => element._id != teaId);

      console.log("updating... " + user._id);
      await User.updateOne({ _id: user._id }, {
         teas: user.teas
      }, { runValidators: true }).then(function (result) {
         
         if (result.upsertedCount !== 0) {
             console.log("Updated!");
             res.status(201).json(user);
         }
         else{
             console.log("couldn't update user's teas");
             res.status(400).json({ "error": "Couldn't update user's teas"});
         }
      });
   }
   catch(err){
      console.log("ERROR");
      res.status(400).send(err);
   }
    
 });

 // get this working, then use something like it to make delete work as well (delete is currently broken af, should update instead of delete a user)
 // Add an existing tea
router.put("/teas/:id", async function(req, res) {
   console.log("Attempting to UPDATE Teas...");
   try{
      const user = await validateUser(req);
      if(!user){
        res.status(401).json({ "error": "User not validated" });
        return;
      }

      const tea = await Tea.find({ _id:req.params.id });
      const exists = user.teas.some(element => element._id == req.params.id);
      if(exists){
         console.log("Tea is already included!");
         res.status(401).json({ "error": "User already has that tea" });
         return;
      }

      user.teas.push(tea[0]);

      console.log("updating... " + user._id);
      await User.updateOne({ _id: user._id }, {
         teas: user.teas
      }, { runValidators: true }).then(function (result) {
         console.log("result: ");
         console.log(result);
         if (result.modifiedCount !== 0) {
             console.log("Updated!");
             res.status(201).json(tea);
         }
         else{
             console.log("couldn't update user's teas");
             res.status(400).json({ "error": "Couldn't update user's teas"});
         }
      });
   }
   catch(err){
      console.log("ERROR");
      res.status(400).send(err);
   }
});

module.exports = router;