# Menuable Lightweight Food Ordering App

![Menuable Screenshot](https://github.com/stevenseb/Menuable/blob/main/menuable.png)


<a href="https://menuable-main.onrender.com">Menuable Live Site</a>

Built with the power of React.js and Node.js: Menuable is a brandable app for small or home-based prepared food service companies to easily create a menu according to their schedule and accept orders for delivery to customers. The idea was inspired by someone who has a business that delivers prepared foods weekly to customers. The problem was that the owner's were publishing a weekly menu via WhatsApp and taking orders via WhatsApp messages or by phone. Then, they were managing weekly orders via these messages or written notes. Often, there might be missing items in orders and it was a challenge to keep up with what was ordered vs. what is available. This app solved these problems by creating a way for customers to place orders using a single method, keeping track of available quantity and when an item is sold out. The owner's dashboard has features to assist in tracking orders, inventory and assembling the delivery route together. Future development will include features like order tracking during delivery to keep customers aware of their delivery time as well as helping to organize the route for delivery.

## Order Selection
Here we can see that as the customer adds items to the cart, the number of unique items in the cart is indicated with the cart icon, the quantity available is managed first with state and reduces the quantity available dynamically as the customer adds items (once order is processed this quantity is updated from state to the database) and each item card displays the total quantity of each unique item in the cart.



![Menuable-ordering](https://github.com/user-attachments/assets/a3e6c136-59e7-44f8-871b-44d5e42af9f8)


## Cart Modal
The cart modal is accessible by the user at any time by clicking the cart icon. Once opened, the user can make changes to the quantity of items in their order, remove items completely and finally, checkout once signed in to complete the order. The modals in the app are managed by creating a modal context with the use of React Context API that is accessible throughout the pages and components.

![Menuable-cart](https://github.com/user-attachments/assets/e9b160a4-2f05-40f5-9e0e-0d57ff6e17df)

