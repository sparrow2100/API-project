const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let eraSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

let composerSchema = mongoose.Schema({
  name: { type: String, required: true },
  life: {
    fullName: { type: String, required: true },
    lifespan: { type: String, required: true },
    bio: { type: String, required: true },
    nationality: { type: String, required: true },
  },
  era: { type: mongoose.Schema.Types.ObjectId, ref: "Era" },
  img: { type: String, required: true },
  imgCredit: String,
  works: [{ piece: String, date: String, description: String }],
});

let userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favouriteComposers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Composer" },
  ],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

let Composer = mongoose.model("Composer", composerSchema);
let Era = mongoose.model("Era", eraSchema);
let User = mongoose.model("User", userSchema);

module.exports.Composer = Composer;
module.exports.Era = Era;
module.exports.User = User;
