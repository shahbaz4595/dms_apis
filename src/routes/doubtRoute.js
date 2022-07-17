const express = require("express");
const router = express.Router();
const doubtController = require("../controllers/doubtController");
const verify = require('../middlewares/authentication');

//Get all the doubts from the database
router.get("/", verify, doubtController.getAllDoubts);

//Add a new doubt in the database
router.post("/", verify, doubtController.addDoubt);

//Get a specific doubt from the database
router.get("/:id", verify, doubtController.getDoubtById);

//Update a doubt record
router.put("/:id", verify, doubtController.updateDoubt);

//Delete a doubt from the database
router.delete("/:id", verify, doubtController.deleteDoubt);

module.exports = router;
