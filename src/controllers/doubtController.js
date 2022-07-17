const Doubt = require("../models/doubt");
const getLatestDoubtID = require("../helpers/getLatestDoubtId");
const getUserDetails = require("../helpers/getUserDetails");

const getAllDoubts = (req, res) => {
  try {
    Doubt.find({}, (err, records) => {
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
};

const addDoubt = async (req, res) => {
  try {
    const user = req.user;
    const userDetails = await getUserDetails(user._id);
    console.log(userDetails);
    const [title, description, attachmentLink] = [
      req.body.title,
      req.body.description,
      req.body.attachmentLink,
    ];
    const createdBy = "Shahbaz";
    const status = 1;
    let ID = await getLatestDoubtID();
    const newDoubt = new Doubt({
      doubtID: Number(ID),
      title: title,
      description: description,
      attachmentLink: attachmentLink,
      createdBy: createdBy,
      status: status,
    });
    newDoubt.save((err) => {
      if (!err) {
        res.send("Successfully Inserted");
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    res.send(err);
  }
};

const getDoubtById = (req, res) => {
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
};

const updateDoubt = (req, res) => {
  try {
    const id = req.params.id;
    const [title, description, attachmentLink, statusID] = [
      req.body.title,
      req.body.description,
      req.body.attachmentLink,
      req.body.statusID,
    ];
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
};

const deleteDoubt = (req, res) => {
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
};

module.exports = {
  getAllDoubts,
  addDoubt,
  getDoubtById,
  updateDoubt,
  deleteDoubt,
};
