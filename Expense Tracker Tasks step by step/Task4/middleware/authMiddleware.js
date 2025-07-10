const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('No token');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Token missing');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};
