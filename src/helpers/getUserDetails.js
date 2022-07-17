const User = require('../models/user');

const getUserDetails = async (_id)=> {
    const userDetails = await User.findOne({_id:_id});
    return userDetails;
}

module.exports = getUserDetails;