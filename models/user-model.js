const { DataTypes } = require("sequelize");
const sequelize = require("../utils/DBoptions");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail:true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if(value)
        this.setDataValue('password',bcrypt.hashSync(value, bcrypt.genSaltSync()));
    },
  },
  appearance: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  auto_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  exp: {
    type: DataTypes.BIGINT,
    defaultValue: -1,
  },
  otp: {
    type: DataTypes.STRING(6),
  },
  otpExpiry: {
    type: DataTypes.BIGINT,
  },
});
User.prototype.Auth=function(password){
  return bcrypt.compareSync(password,this.password)
}
User.sync({force:true});

module.exports = User;
