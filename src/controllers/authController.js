const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { rawListeners } = require("../app");
const saltRounds = 10;

const register = (req, res) => {
  const [firstName, lastName, email, password] = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
  ];

  bcrypt.hash(password, saltRounds, (err, hashedPassword)=> {
    if (!err) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      newUser.save();
      res.send("Registered Successfully");
    } else {
      res.send(err);
    }
  });
};

const login = (req, res) => {
    const [email, password] = [req.body.email, req.body.password];
    User.findOne({email:email}, (err, foundUser) => {
        if (!err) {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, (err, result) => {
                    if (!err) {
                        if (result) {
                            const token = jwt.sign({_id: foundUser._id, sub: foundUser.firstName}, process.env.TOKEN_SECRET);
                            res.header('auth-token', token).send(token);
                        }
                        else {
                            res.send("Password does not match!");
                        }
                    }
                });
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.send(err)
        }
    })
}

module.exports = { register, login };
