const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    appearance: {
      type: Number,
      default: 1,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    auto_delete: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    exp: {
      type: Number,
      default: -1,
    },
    otp: {
      type: Number,
      minLength: 6,
      maxLength: 6,
    },
    otpExpiry: {
      type: Number,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.otp;
        delete ret.otpExpiry;
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.confirmed;
        delete ret.exp;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(
      this._update.password,
      bcrypt.genSaltSync()
    );
  next();
});

userSchema.method("Auth", function (password) {
  return bcrypt.compareSync(password, this.password);
});

module.exports = mongoose.model("User", userSchema);
