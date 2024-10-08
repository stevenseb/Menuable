# Diff Details

Date : 2024-10-04 21:12:20

Directory /home/stevenseb/projects/Menubile/frontend

Total : 92 files,  197 codes, -130 comments, 66 blanks, all 133 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.eslintrc.js](/backend/.eslintrc.js) | Babel JavaScript | -23 | 0 | -1 | -24 |
| [backend/app.js](/backend/app.js) | Babel JavaScript | -77 | -13 | -17 | -107 |
| [backend/config/database.js](/backend/config/database.js) | Babel JavaScript | -24 | 0 | -2 | -26 |
| [backend/config/index.js](/backend/config/index.js) | Babel JavaScript | -9 | 0 | -1 | -10 |
| [backend/db/migrations/20240415205158-create-user.js](/backend/db/migrations/20240415205158-create-user.js) | Babel JavaScript | -66 | 0 | -4 | -70 |
| [backend/db/migrations/20240611175626-create-item.js](/backend/db/migrations/20240611175626-create-item.js) | Babel JavaScript | -77 | 0 | -3 | -80 |
| [backend/db/migrations/20240611194026-create-order.js](/backend/db/migrations/20240611194026-create-order.js) | Babel JavaScript | -46 | 0 | -3 | -49 |
| [backend/db/migrations/20240611194208-create-route.js](/backend/db/migrations/20240611194208-create-route.js) | Babel JavaScript | -43 | 0 | -3 | -46 |
| [backend/db/migrations/20240611194220-create-review.js](/backend/db/migrations/20240611194220-create-review.js) | Babel JavaScript | -47 | -1 | -4 | -52 |
| [backend/db/migrations/20240611212700-create-order-item.js](/backend/db/migrations/20240611212700-create-order-item.js) | Babel JavaScript | -57 | 0 | -3 | -60 |
| [backend/db/migrations/20240611212808-add-associations-to-order.js](/backend/db/migrations/20240611212808-add-associations-to-order.js) | Babel JavaScript | -56 | 0 | -4 | -60 |
| [backend/db/migrations/20240612191144-add-associations-to-order-item.js](/backend/db/migrations/20240612191144-add-associations-to-order-item.js) | Babel JavaScript | -52 | 0 | -9 | -61 |
| [backend/db/migrations/20240824110120-add-associations-to-item.js](/backend/db/migrations/20240824110120-add-associations-to-item.js) | Babel JavaScript | -76 | -5 | -8 | -89 |
| [backend/db/migrations/20240824115120-add-associations-to-user.js](/backend/db/migrations/20240824115120-add-associations-to-user.js) | Babel JavaScript | -44 | -5 | -8 | -57 |
| [backend/db/migrations/20240824120120-add-associations-to-review.js](/backend/db/migrations/20240824120120-add-associations-to-review.js) | Babel JavaScript | -44 | -4 | -7 | -55 |
| [backend/db/models/index.js](/backend/db/models/index.js) | Babel JavaScript | -37 | 0 | -7 | -44 |
| [backend/db/models/item.js](/backend/db/models/item.js) | Babel JavaScript | -69 | 0 | -1 | -70 |
| [backend/db/models/order.js](/backend/db/models/order.js) | Babel JavaScript | -41 | 0 | -2 | -43 |
| [backend/db/models/orderitem.js](/backend/db/models/orderitem.js) | Babel JavaScript | -46 | 0 | -2 | -48 |
| [backend/db/models/review.js](/backend/db/models/review.js) | Babel JavaScript | -33 | 0 | -1 | -34 |
| [backend/db/models/route.js](/backend/db/models/route.js) | Babel JavaScript | -30 | 0 | -2 | -32 |
| [backend/db/models/user.js](/backend/db/models/user.js) | Babel JavaScript | -100 | 0 | -4 | -104 |
| [backend/db/seeders/20240611205135-demo-users.js](/backend/db/seeders/20240611205135-demo-users.js) | Babel JavaScript | -208 | 0 | -5 | -213 |
| [backend/db/seeders/20240611205150-demo-items.js](/backend/db/seeders/20240611205150-demo-items.js) | Babel JavaScript | -257 | 0 | -7 | -264 |
| [backend/db/seeders/20240827120580-demo-reviews.js](/backend/db/seeders/20240827120580-demo-reviews.js) | Babel JavaScript | -254 | 0 | -7 | -261 |
| [backend/psql-setup-script.js](/backend/psql-setup-script.js) | Babel JavaScript | -6 | 0 | -2 | -8 |
| [backend/routes/api/index.js](/backend/routes/api/index.js) | Babel JavaScript | -49 | -4 | -18 | -71 |
| [backend/routes/api/items.js](/backend/routes/api/items.js) | Babel JavaScript | -157 | -7 | -26 | -190 |
| [backend/routes/api/orderItems.js](/backend/routes/api/orderItems.js) | Babel JavaScript | -26 | -2 | -5 | -33 |
| [backend/routes/api/orders.js](/backend/routes/api/orders.js) | Babel JavaScript | -166 | -80 | -34 | -280 |
| [backend/routes/api/reviews.js](/backend/routes/api/reviews.js) | Babel JavaScript | -74 | -7 | -13 | -94 |
| [backend/routes/api/routes.js](/backend/routes/api/routes.js) | Babel JavaScript | -6 | -4 | -12 | -22 |
| [backend/routes/api/session.js](/backend/routes/api/session.js) | Babel JavaScript | -67 | -4 | -18 | -89 |
| [backend/routes/api/users.js](/backend/routes/api/users.js) | Babel JavaScript | -153 | -8 | -28 | -189 |
| [backend/routes/index.js](/backend/routes/index.js) | Babel JavaScript | -30 | -7 | -7 | -44 |
| [backend/utils/auth.js](/backend/utils/auth.js) | Babel JavaScript | -55 | -6 | -19 | -80 |
| [backend/utils/bookingsController.js](/backend/utils/bookingsController.js) | Babel JavaScript | -102 | -2 | -16 | -120 |
| [backend/utils/spotsController.js](/backend/utils/spotsController.js) | Babel JavaScript | -191 | -7 | -24 | -222 |
| [backend/utils/validation.js](/backend/utils/validation.js) | Babel JavaScript | -56 | -5 | -11 | -72 |
| [frontend/dist/assets/index-1b33260d.js](/frontend/dist/assets/index-1b33260d.js) | Babel JavaScript | 805 | 0 | 62 | 867 |
| [frontend/src/App.jsx](/frontend/src/App.jsx) | Babel JavaScript | 55 | 0 | 8 | 63 |
| [frontend/src/components/Cart/Cart.jsx](/frontend/src/components/Cart/Cart.jsx) | Babel JavaScript | 16 | 0 | 4 | 20 |
| [frontend/src/components/Cart/CartItem.jsx](/frontend/src/components/Cart/CartItem.jsx) | Babel JavaScript | 22 | 0 | 6 | 28 |
| [frontend/src/components/Cart/CartModal.jsx](/frontend/src/components/Cart/CartModal.jsx) | Babel JavaScript | 97 | 0 | 13 | 110 |
| [frontend/src/components/Cart/index.js](/frontend/src/components/Cart/index.js) | Babel JavaScript | 4 | 0 | 3 | 7 |
| [frontend/src/components/Checkout/Checkout.jsx](/frontend/src/components/Checkout/Checkout.jsx) | Babel JavaScript | 106 | 1 | 14 | 121 |
| [frontend/src/components/Checkout/index.js](/frontend/src/components/Checkout/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/CreateReviewModal/CreateReviewModal.jsx](/frontend/src/components/CreateReviewModal/CreateReviewModal.jsx) | Babel JavaScript | 77 | 0 | 9 | 86 |
| [frontend/src/components/CreateReviewModal/index.js](/frontend/src/components/CreateReviewModal/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/Dashboard/AddItem.jsx](/frontend/src/components/Dashboard/AddItem.jsx) | Babel JavaScript | 93 | 3 | 12 | 108 |
| [frontend/src/components/Dashboard/DeleteModal.jsx](/frontend/src/components/Dashboard/DeleteModal.jsx) | Babel JavaScript | 16 | 1 | 4 | 21 |
| [frontend/src/components/Dashboard/EditMenu.jsx](/frontend/src/components/Dashboard/EditMenu.jsx) | Babel JavaScript | 73 | 0 | 12 | 85 |
| [frontend/src/components/Dashboard/Inventory.jsx](/frontend/src/components/Dashboard/Inventory.jsx) | Babel JavaScript | 117 | 0 | 17 | 134 |
| [frontend/src/components/Dashboard/LoadingSpinner.jsx](/frontend/src/components/Dashboard/LoadingSpinner.jsx) | Babel JavaScript | 13 | 0 | 4 | 17 |
| [frontend/src/components/Dashboard/MainPage.jsx](/frontend/src/components/Dashboard/MainPage.jsx) | Babel JavaScript | 54 | 3 | 6 | 63 |
| [frontend/src/components/Dashboard/Routes.jsx](/frontend/src/components/Dashboard/Routes.jsx) | Babel JavaScript | 17 | 0 | 3 | 20 |
| [frontend/src/components/Dashboard/SuccessModal.jsx](/frontend/src/components/Dashboard/SuccessModal.jsx) | Babel JavaScript | 12 | 0 | 4 | 16 |
| [frontend/src/components/Dashboard/index.js](/frontend/src/components/Dashboard/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/DisplayMenu/DisplayMenu.jsx](/frontend/src/components/DisplayMenu/DisplayMenu.jsx) | Babel JavaScript | 144 | 0 | 13 | 157 |
| [frontend/src/components/DisplayMenu/index.js](/frontend/src/components/DisplayMenu/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/Footer/Footer.jsx](/frontend/src/components/Footer/Footer.jsx) | Babel JavaScript | 29 | 0 | 3 | 32 |
| [frontend/src/components/Footer/index.js](/frontend/src/components/Footer/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/LoginFormModal/LoginFormModal.jsx](/frontend/src/components/LoginFormModal/LoginFormModal.jsx) | Babel JavaScript | 87 | 0 | 7 | 94 |
| [frontend/src/components/LoginFormModal/index.js](/frontend/src/components/LoginFormModal/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/MyAccount/MyAccount.jsx](/frontend/src/components/MyAccount/MyAccount.jsx) | Babel JavaScript | 129 | 0 | 15 | 144 |
| [frontend/src/components/NavBar/CartIcon.jsx](/frontend/src/components/NavBar/CartIcon.jsx) | Babel JavaScript | 29 | 0 | 5 | 34 |
| [frontend/src/components/NavBar/NavBar.jsx](/frontend/src/components/NavBar/NavBar.jsx) | Babel JavaScript | 32 | 0 | 5 | 37 |
| [frontend/src/components/NavBar/ProfileButton.jsx](/frontend/src/components/NavBar/ProfileButton.jsx) | Babel JavaScript | 88 | 0 | 17 | 105 |
| [frontend/src/components/NavBar/index.js](/frontend/src/components/NavBar/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/OpenModalButton/OpenModalButton.jsx](/frontend/src/components/OpenModalButton/OpenModalButton.jsx) | Babel JavaScript | 17 | 1 | 6 | 24 |
| [frontend/src/components/OpenModalButton/index.js](/frontend/src/components/OpenModalButton/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/ReviewsModal/ReviewsModal.jsx](/frontend/src/components/ReviewsModal/ReviewsModal.jsx) | Babel JavaScript | 75 | 0 | 9 | 84 |
| [frontend/src/components/ReviewsModal/index.js](/frontend/src/components/ReviewsModal/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/SignupFormModal/SignupFormModal.jsx](/frontend/src/components/SignupFormModal/SignupFormModal.jsx) | Babel JavaScript | 209 | 0 | 19 | 228 |
| [frontend/src/components/SignupFormModal/index.js](/frontend/src/components/SignupFormModal/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/UI/BackToTopButton.jsx](/frontend/src/components/UI/BackToTopButton.jsx) | Babel JavaScript | 30 | 0 | 7 | 37 |
| [frontend/src/components/UI/index.js](/frontend/src/components/UI/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/components/utils.js](/frontend/src/components/utils.js) | Babel JavaScript | 17 | 0 | 6 | 23 |
| [frontend/src/context/Modal.jsx](/frontend/src/context/Modal.jsx) | Babel JavaScript | 44 | 0 | 9 | 53 |
| [frontend/src/hooks/index.js](/frontend/src/hooks/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/hooks/useClickOutside.js](/frontend/src/hooks/useClickOutside.js) | Babel JavaScript | 14 | 0 | 4 | 18 |
| [frontend/src/main.jsx](/frontend/src/main.jsx) | Babel JavaScript | 26 | 0 | 6 | 32 |
| [frontend/src/store/cart.js](/frontend/src/store/cart.js) | Babel JavaScript | 100 | 7 | 6 | 113 |
| [frontend/src/store/csrf.js](/frontend/src/store/csrf.js) | Babel JavaScript | 33 | 5 | 9 | 47 |
| [frontend/src/store/index.js](/frontend/src/store/index.js) | Babel JavaScript | 2 | 0 | 2 | 4 |
| [frontend/src/store/item.js](/frontend/src/store/item.js) | Babel JavaScript | 110 | 7 | 14 | 131 |
| [frontend/src/store/order.js](/frontend/src/store/order.js) | Babel JavaScript | 80 | 4 | 13 | 97 |
| [frontend/src/store/review.js](/frontend/src/store/review.js) | Babel JavaScript | 111 | 2 | 10 | 123 |
| [frontend/src/store/selectors.js](/frontend/src/store/selectors.js) | Babel JavaScript | 5 | 0 | 2 | 7 |
| [frontend/src/store/session.js](/frontend/src/store/session.js) | Babel JavaScript | 95 | 6 | 15 | 116 |
| [frontend/src/store/store.js](/frontend/src/store/store.js) | Babel JavaScript | 27 | 0 | 5 | 32 |
| [frontend/vite.config.js](/frontend/vite.config.js) | Babel JavaScript | 17 | 1 | 2 | 20 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details