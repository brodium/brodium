module.exports = {
  getCompanies(req, res) {
    const db = req.app.get("db")

    db.getAllCompanies()
      .then(companies => res.status(200).send(companies))
      .catch(console.log)
  }
}