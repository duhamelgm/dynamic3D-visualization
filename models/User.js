const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

const HASH_CICLES = 10;
const JWT_TOKEN_EXPIRES = "2d";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, HASH_CICLES);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

UserSchema.methods.signJwtPayload = async function(user) {
  try {
    const payload = { id: this.id, email: this.email };
    return jwt.sign(payload, keys.secretOrKey, { expiresIn: JWT_TOKEN_EXPIRES });
  } catch (err) {
    throw err;
  }
};

module.exports = User = mongoose.model("users", UserSchema);
