const notFound = (req, res, next) => {
  return res.status(404).json({ error: `This url  does not exist. ` });
};

module.exports = notFound;
