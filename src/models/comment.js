const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const commentSchema = new Schema({
      comment: {
        type: String,
        required: true,
      },
      commentedBy: {
        type: String,
        required: true,
      }
}, { timestamps: true});

const Comment = new Model("comment", commentSchema);

module.exports = { commentSchema, Comment }