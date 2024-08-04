const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Item, Order, OrderItem, ItemImage, Route } = require('../../db/models');


module.exports = router;
