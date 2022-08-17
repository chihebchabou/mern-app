const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token)
    return res.status(401).json({ msg: 'Not token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
