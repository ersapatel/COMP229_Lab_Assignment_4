import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret_key';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // header check
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Expect Bearer token
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization format. Expected: Bearer <token>' });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
