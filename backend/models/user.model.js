const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: process.env.USER_ROLE,
    },
    contactNumber: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

/** --- virtual methods ---- */
userSchema.virtual('password')
.set(function(password){
    this.hashedPassword = bcrypt.hashSync(password, 10);
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hashedPassword);//return true if matched else false
    }
}

module.exports = mongoose.model("Users", userSchema);