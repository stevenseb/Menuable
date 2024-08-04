const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Route, Order } = require('../../db/models');


// GET current route


// GET all routes


// GET route by routeId



// GET all order items for route by routeId and grouped by itemId (route total sales by item)


module.exports = router;
