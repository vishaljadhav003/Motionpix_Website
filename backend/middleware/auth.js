module.exports = (req, res, next) => {
  if (req.session && req.session.isAuth === true) {
    return next();
  }

  return res.redirect("/api/login");
};