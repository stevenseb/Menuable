// backend/routes/api/session.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateLogin } = require('../../utils/validation');

 

// LOG IN
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      },
    });
    
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      return res.status(401).json({
        message: 'Login failed',
        errors: { credential: 'The provided credentials were invalid.' }
      });
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      address: user.address,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
});






// RESTORE session user
router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        phone: user.phone,
        address: user.address,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);


  // LOG OUT
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );


module.exports = router;
