// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { validateSignup } = require('../../utils/validation');
const { User } = require('../../db/models');

// USER SIGN UP
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  } catch (error) {
    if (error.message.includes('Email already exists')) {
      return res.status(500).json({
        message: "User already exists",
        errors: {
          email: "User with that email already exists"
        }
      });
    } else if (error.message.includes('Username already exists')) {
      return res.status(500).json({
        message: "User already exists",
        errors: {
          username: "User with that username already exists"
        }
      });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST edit user by userId
router.post('/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, username, phone, address } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    res.json({ user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE user by userId
router.delete('/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await user.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
