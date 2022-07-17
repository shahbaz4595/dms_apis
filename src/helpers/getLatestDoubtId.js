require("dotenv").config();
const Doubt = require("../models/doubt");

const getLatestDoubtID = async () => {
    try {
        let latestRecord = await Doubt.findOne().sort({ _id: -1 }).exec();
        if (latestRecord) {
            return ++latestRecord.doubtID;
        }
        else {
            return process.env.STARTER_ID;
        }
    }
   catch (err) {
        throw (err);
   }   
};

module.exports = getLatestDoubtID;