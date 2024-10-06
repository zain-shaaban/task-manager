const { DataTypes } = require("sequelize");
const sequelize = require("../utils/DBoptions");
const User = require("./user-model");
const Task = sequelize.define(
  "Task",
  {
    taskId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    last_updated: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "userId",
      },
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId" });

Task.sync();

module.exports = Task;
