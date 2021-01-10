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


/** hashSync is a sync method so on backend or server side we should not use it, we should use async method */
userSchema.virtual('password')
.set(function(password){
    this.hashedPassword = bcrypt.hashSync(password, 10);
});

/** REMEMBER: we can not use hash (aync method ) like this to set the hashed password,
 * because this function will call after the User() object created so when User() obj creates then
 * it requires all the required data, so this will give an error like hashedPassword is required
 * but if u pass 'hashedPassword' insted of 'password' while creating User(), i hope this will work
 */
// userSchema.virtual('password')
// .set(async function(password){
//     this.hashedPassword = await bcrypt.hash(password, 10);
// });



userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

/** compareSync is a sync method so on backend or server side we should not use it, we should use async method */
// userSchema.methods = {
//     authenticate: function(password) {
//         return bcrypt.compareSync(password, this.hashedPassword);//return true if matched else false
//     }
// }

userSchema.methods = {
  authenticate: async function(password) {
      return await bcrypt.compare(password, this.hashedPassword);//return true if matched else false
  }
}

module.exports = mongoose.model("Users", userSchema);