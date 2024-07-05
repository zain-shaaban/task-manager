const notFound = (req, res) => {
  res.status(404).json({ message: "Sorry This Route Is Not Exist :(" });
};
module.exports = notFound;
