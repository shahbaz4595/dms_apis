require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DMS_DB);

// Creating and Mapping the ODM using mongoose to MongoDB
const doubtCommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commentedBy: {
    type: String,
    required: true,
  },
  commentedDate: Date
});

const statusSchema = new mongoose.Schema({
  statusID: Number,
  statusLabel: String,
});

const doubtSchema = new mongoose.Schema({
  doubtID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachmentLink: String,
  comments: [doubtCommentsSchema],
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  modifiedBy: {
    type: String,
  },
  modifiedDate: {
    type: Date,
  },
  status: {
    type: Number,
    required: true,
  },
});

const StatusMaster = new mongoose.model("status_master", statusSchema);

const Doubt = new mongoose.model("doubt", doubtSchema);

// Handling doubt requests
app
  .route("/doubts")
  .get((req, res) => {
    try {
      Doubt.find({ status: 1 }, (err, records) => {
        if (!err) {
          if (records.length === 0) {
            res.sendStatus(404);
          } else {
            res.send(records);
          }
        }
      });
    } catch (err) {
      res.send(err);
    }
  })
  .post((req, res) => {
    try {
      const [title, description, attachmentLink] = [
        req.body.title,
        req.body.description,
        req.body.attachmentLink,
      ];
      const createdDate = new Date();
      const createdBy = "Shahbaz";
      const status = 1;
      let ID = 0;
      Doubt.findOne()
        .sort({ _id: -1 })
        .exec((err, latestRecord) => {
          if (!err) {
            if (!latestRecord) {
              ID = process.env.STARTER_ID;
            } else {
              ID = ++latestRecord.doubtID;
            }
            const newDoubt = new Doubt({
              doubtID: Number(ID),
              title: title,
              description: description,
              attachmentLink: attachmentLink,
              createdBy: createdBy,
              createdDate: createdDate,
              status: status,
            });
            newDoubt.save((err) => {
              if (!err) {
                res.send("Successfully Inserted");
              } else {
                res.send(err);
              }
            });
          } else {
            res.send(err);
          }
        });
    } catch (err) {
      res.send(err);
    }
  });

app
  .route("/doubts/:id")
  .get((req, res) => {
    try {
      const id = req.params.id;
      Doubt.findOne({ _id: id }, (err, record) => {
        if (!err) {
          if (record) {
            res.send(record);
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
  })
  .put((req, res) => {
    try {
      const id = req.params.id;
      const [title, description, attachmentLink, statusID] = [
        req.body.title,
        req.body.description,
        req.body.attachmentLink,
        req.body.statusID,
      ];
      const modifiedDate = new Date();
      const modifiedBy = "Shahbaz Khan";
      Doubt.updateOne(
        { _id: id },
        {
          title: title,
          description: description,
          attachmentLink: attachmentLink,
          statusID: Number(statusID),
        },
        (err, record) => {
          if (!err) {
            res.send("Updated Successfully!");
          } else {
            res.send(err);
          }
        }
      );
    } catch (err) {
      res.send(err);
    }
  })
  .delete((req, res) => {
    try {
      const id = req.params.id;
      Doubt.deleteOne({ _id: id }, (err) => {
        if (!err) {
          res.send("Deleted Successfully");
        } else {
          res.send(err);
        }
      });
    } catch (err) {
      res.send(err);
    }
  });

app.route("/comments/:id")
  .post((req, res) => {
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
            commentedDate: commentedDate
          };
          if (record.comments) {
            record.comments.push(newComment);
            record.save();
          }
          else {
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
})
  

app.route("/comments/:id/:commentId")
  .put((req, res) => {
    try {
      const [id, commentId, comment] = [req.params.id, req.params.commentId, req.body.comment];
      Doubt.findOneAndUpdate({"comments._id": commentId}, {$set: {"comments.$.comment": comment }}, (err)=> {
        if (!err) {
          res.send("Comment updated successfully");
        }
        else {
          res.send(err);
        }
      })
    }
    catch (err) {
      res.send(err);
    }
  })
  .delete((req, res) => {
    try {
      const id = req.params.id;
      const commentId = req.params.commentId;
      Doubt.updateOne({_id: id}, {$pull: {comments: {_id:commentId}}}, (err)=>{
        if (!err) {
          res.send("Comment deleted successfully");
        }
        else {
          res.send(err);
        }
      })
     
    }
    catch (err) {
      res.send(err);
    }
  })


app.listen(process.env.PORT, () => {
  console.log("running on 3000");
});
