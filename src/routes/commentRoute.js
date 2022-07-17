const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verify = require('../middlewares/authentication');


//Add a new comment to an existing doubt
router.post("/:id",verify, commentController.addComment);

//Update a comment on a doubt
router.put("/:id/:commentId", verify,  commentController.updateComment);

//Delete a comment from the doubt
router.delete("/:id/:commentId", verify, commentController.deleteComment);

module.exports = router;
