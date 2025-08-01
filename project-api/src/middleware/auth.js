function getUserId(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1] || auth;
  req.userId = token;
  next();
}

module.exports = { getUserId };
