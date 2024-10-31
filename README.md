# Menuable Lightweight Food Ordering App

![Menuable Screenshot](https://github.com/stevenseb/Menuable/blob/main/menuable.png)


<a href="https://menuable-main.onrender.com">Menuable Live Site</a>

Built with the power of React.js and Node.js: Menuable is a brandable app for small or home-based prepared food service companies to easily create a menu according to their schedule and accept orders for delivery to customers. The idea was inspired by someone who has a business that delivers prepared foods weekly to customers. The problem was that the owner's were publishing a weekly menu via WhatsApp and taking orders via WhatsApp messages or by phone. Then, they were managing weekly orders via these messages or written notes. Often, there might be missing items in orders and it was a challenge to keep up with what was ordered vs. what is available. This app solved these problems by creating a way for customers to place orders using a single method, keeping track of available quantity and when an item is sold out. The owner's dashboard has features to assist in tracking orders, inventory and assembling the delivery route together. Future development will include features like order tracking during delivery to keep customers aware of their delivery time as well as helping to organize the route for delivery.

# Customer Order Flow:

## Order Selection
Here we can see that as the customer adds items to the cart, the number of unique items in the cart is indicated with the cart icon, the quantity available is managed first with state and reduces the quantity available dynamically as the customer adds items (once order is processed this quantity is updated from state to the database) and each item card displays the total quantity of each unique item in the cart.



![Menuable-ordering](https://github.com/user-attachments/assets/a3e6c136-59e7-44f8-871b-44d5e42af9f8)


## Cart Modal
The cart modal is accessible by the user at any time by clicking the cart icon. Once opened, the user can make changes to the quantity of items in their order, remove items completely and finally, checkout once signed in to complete the order. The modals in the app are managed by creating a modal context with the use of React Context API that is accessible throughout the pages and components.

![Menuable-cart](https://github.com/user-attachments/assets/e9b160a4-2f05-40f5-9e0e-0d57ff6e17df)

## Checkout
The checkout page first displays the pending order and prompts the user to review their delivery address with an option to edit the address before placing the order. Once the address is confirmed, the user is presented a checkout button to complete the order.

![{3A25AEE3-EABC-436D-8FEE-1C3A8F83F35F}](https://github.com/user-attachments/assets/95a4ef1a-1a92-42f5-ad5f-553c2a470a79)

Once the checkout button is selected, the user is redirected to their my account page where they can view their previous and new order.

![{F8DA0BEF-AF0A-4257-9B4E-E1F48CEFBBFB}](https://github.com/user-attachments/assets/e4b0817b-1086-4b51-97e2-23ae597d72f5)

# Owner's Dashboard
## Setting and Modifying the Menu


## Adding New Menu Items

## Checking or Adjusting Inventory

## Delivery Route Management



## My Account
Here the user will see previous orders and their contact information. Orders are rendered in a collapsed view and can be expanded to view and then collapsed again.

![{547E2250-E34B-4EE1-9322-592FB7372212}](https://github.com/user-attachments/assets/fa0bb264-260d-4049-8e50-63d8e1249dbc)


