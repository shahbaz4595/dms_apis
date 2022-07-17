const Doubt = require("../models/doubt");

const addComment = (req, res) => {
  try {
    const id = req.params.id;
    const comment = req.body.comment;
    const commentedBy = "Shahbaz";
    const commentedDate = new Date();
    Doubt.findOne({ _id: id }, (err, record) => {
      if (!err) {
        if (record) {
          const newComment = {
            comment: comment,
            commentedBy: commentedBy,
            commentedDate: commentedDate,
          };
          if (record.comments) {
            record.comments.push(newComment);
            record.save();
          } else {
            record.comments = [...newComment];
            record.save();
          }
          res.send("Comment Added Successfully");
        } else {
          res.sendStatus(404);
        }
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    res.send(err);
  }
};

const updateComment = (req, res) => {
  try {
    const [id, commentId, comment] = [
      req.params.id,
      req.params.commentId,
      req.body.comment,
    ];
    Doubt.findOneAndUpdate(
      { "comments._id": commentId },
      { $set: { "comments.$.comment": comment } },
      (err) => {
        if (!err) {
          res.send("Comment updated successfully");
        } else {
          res.send(err);
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
};

const deleteComment = (req, res) => {
  try {
    const id = req.params.id;
    const commentId = req.params.commentId;
    Doubt.updateOne(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      (err) => {
        if (!err) {
          res.send("Comment deleted successfully");
        } else {
          res.send(err);
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addComment,
  updateComment,
  deleteComment,
};
