module.exports = {
  getCompanies(req, res) {
    const db = req.app.get("db")

    db.getAllCompanies()
      .then(res.sendStatus(200))
      .catch(console.log)
  }
}