// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { validateSignup } = require('../../utils/validation');
const { User, Order, Route, OrderItem, Item } = require('../../db/models');

// USER SIGN UP
router.post('/', async (req, res, next) => {
    try {
        const { username, firstName, lastName, email, password, phone, address } = req.body;
        
        // Check if username already exists
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if phone already exists
        const existingPhone = await User.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        const user = await User.scope('withAllFields').create({
            username,
            firstName,
            lastName,
            email,
            hashedPassword: bcrypt.hashSync(password, 10),
            phone,
            address,
            points: 0
        });
        
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
    } catch (error) {
        console.error('Detailed signup error:', error);
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                message: 'Validation error',
                errors: validationErrors
            });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(400).json({
                message: `${field} already exists`
            });
        } else {
            return res.status(500).json({
                message: 'An unexpected error occurred during signup',
                error: error.message
            });
        }
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
      phone: user.phone,
      address: user.address,
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

// GET /api/users/:userId/orders
router.get('/:userId/orders', requireAuth, async (req, res) => {
    const { userId } = req.params;
    
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    try {
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: Route,
            attributes: ['deliveryDate']
          },
          {
            model: Item,
            as: 'Items',
            through: {
                model: OrderItem,
                as: 'OrderItems',
                attributes: ['quantity', 'units', 'measure', 'pricePerUnit']
            },
            attributes: ['name']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
