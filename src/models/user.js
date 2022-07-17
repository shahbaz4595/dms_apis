const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const roleSchema = new Schema({
    roleId: Number,
    role: String
});

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    role: roleSchema,
    password: {
        type: String,
        required: true
    },
    active: Boolean,
    token: String
});

const User = new Model("user", userSchema);

module.exports = User;