const sequelize=require("../utils/DBoptions")

module.exports = async () => {
  try {
    await sequelize.authenticate()
    console.log("DB Connected Successfully...");
  } catch (error) {
    console.error(error.message);
  }
};
