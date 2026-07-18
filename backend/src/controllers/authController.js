const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'borewell@admin123';
  const userUsername = process.env.USER_USERNAME || 'admin';
  const userPassword = process.env.USER_PASSWORD || 'admin';

  let role = null;

  if (username === adminUsername && password === adminPassword) {
    role = 'admin';
  } else if (username === userUsername && password === userPassword) {
    role = 'user';
  }

  if (!role) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ role }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token, role });
};
