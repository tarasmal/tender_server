const badRequest = (req, res) =>  res.status(404).json({message: "404 PAGE NOT FOUND"})

module.exports = badRequest