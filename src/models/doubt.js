const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const comment = require("./comment");

const doubtSchema = new Schema({
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
    comments: [comment.commentSchema],
    createdBy: {
      type: String,
      required: true,
    },
    modifiedBy: {
      type: String,
    },
    status: {
      type: Number,
      required: true,
    },
  }, { timestamps: true });

  const Doubt = new Model("doubt", doubtSchema);

  module.exports = Doubt;