const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Item, Order, OrderItem, ItemImage, Route } = require('../../db/models');


// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'phone', 'address']
        },
        {
          model: Route,
          attributes: ['deliveryDate']
        }
      ]
    });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // GET all orders by userId
// router.get('/user/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const orders = await Order.findAll({
//       where: { userId },
//       include: [
//         {
//           model: User,
//           attributes: ['firstName', 'lastName', 'phone', 'address']
//         },
//         {
//           model: Route,
//           attributes: ['deliveryDate']
//         }
//       ]
//     });
//     res.json({ orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // GET all orders for current user
// router.get('/current', requireAuth, async (req, res) => {
//   const { user } = req;
//   try {
//     const orders = await Order.findAll({
//       where: { userId: user.id },
//       include: [
//         {
//           model: User,
//           attributes: ['firstName', 'lastName', 'phone', 'address']
//         },
//         {
//           model: Route,
//           attributes: ['deliveryDate']
//         }
//       ]
//     });
//     res.json({ orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // GET most recent order by userId (based on most recent orderDate)
// router.get('/user/:userId/recent', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const order = await Order.findOne({
//       where: { userId },
//       order: [['orderDate', 'DESC']],
//       include: [
//         {
//           model: User,
//           attributes: ['firstName', 'lastName', 'phone', 'address']
//         },
//         {
//           model: Route,
//           attributes: ['deliveryDate']
//         }
//       ]
//     });
//     if (order) {
//       res.json({ order });
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// GET all orders by routeId (include user on order with full name, phone, and address)
router.get('/route/:routeId', async (req, res) => {
  const { routeId } = req.params;
  try {
    const orders = await Order.findAll({
      where: { routeId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'phone', 'address']
        },
        {
          model: Route,
          attributes: ['deliveryDate']
        }
      ]
    });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST a new order
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    const { routeId, total, orderDate, items } = req.body;
  
    try {
      const order = await Order.create({
        userId: user.id,
        routeId,
        total,
        orderDate
      });
  
      if (items && items.length > 0) {
        const orderItems = await Promise.all(items.map(async (item) => {
          const dbItem = await Item.findByPk(item.id);
          if (!dbItem) {
            throw new Error(`Item with id ${item.id} not found`);
          }
          return {
            orderId: order.id,
            itemId: dbItem.id,
            quantity: item.quantity,
            units: dbItem.units,
            measure: dbItem.measure,
            pricePerUnit: dbItem.price,
            costPerUnit: dbItem.costPerUnit
          };
        }));
  
        await OrderItem.bulkCreate(orderItems);
      }
  
      res.status(201).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// DELETE an order
router.delete('/:orderId', requireAuth, async (req, res) => {
  const { orderId } = req.params;
  const { user } = req;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await order.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST edit an order
router.post('/:orderId', requireAuth, async (req, res) => {
  const { orderId } = req.params;
  const { user } = req;
  const { routeId, total, orderDate, items } = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    order.routeId = routeId || order.routeId;
    order.total = total || order.total;
    order.orderDate = orderDate || order.orderDate;

    await order.save();

    if (items && items.length > 0) {
      await OrderItem.destroy({ where: { orderId: order.id } });
      const orderItems = items.map(item => ({
        orderId: order.id,
        itemId: item.itemId,
        units: item.units
      }));

      await OrderItem.bulkCreate(orderItems);
    }

    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET all items by orderId
router.get('/:orderId/items', async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderItems = await OrderItem.findAll({
      where: { orderId },
      include: [
        {
          model: Item,
          attributes: [
            'name', 
            'description', 
            'price', 
            'units', 
            'measure', 
            'numRatings', 
            'stars', 
            'avgStars', 
            'quantityOnHand'
          ],
          include: [
            {
              model: ItemImage,
              attributes: ['url']
            }
          ]
        }
      ]
    });

    const items = orderItems.map(orderItem => orderItem.Item);

    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
