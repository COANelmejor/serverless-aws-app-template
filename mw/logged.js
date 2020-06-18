module.exports = function(req, res, next){
  if (req.user == undefined) {
    res.status(401).send({
      message:'No tienes permiso para acceder a este proceso.'
    })
  } else {
    next();
  }
}