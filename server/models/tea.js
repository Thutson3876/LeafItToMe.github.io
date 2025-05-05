const db = require("../db");

// Create a model from the schema
const Tea = db.model("Tea", {
   name: { type: String, required: true },
   type: { type: String, required: true },
   desc: { type: String, required: true },
   rating: { type: Number, required: true }
});

module.exports = Tea;