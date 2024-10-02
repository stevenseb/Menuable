# Details

Date : 2024-10-01 21:37:24

Directory /home/stevenseb/projects/Menubile/backend

Total : 39 files,  2954 codes, 171 comments, 348 blanks, all 3473 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.eslintrc.js](/backend/.eslintrc.js) | Babel JavaScript | 23 | 0 | 1 | 24 |
| [backend/app.js](/backend/app.js) | Babel JavaScript | 77 | 13 | 17 | 107 |
| [backend/config/database.js](/backend/config/database.js) | Babel JavaScript | 24 | 0 | 2 | 26 |
| [backend/config/index.js](/backend/config/index.js) | Babel JavaScript | 9 | 0 | 1 | 10 |
| [backend/db/migrations/20240415205158-create-user.js](/backend/db/migrations/20240415205158-create-user.js) | Babel JavaScript | 66 | 0 | 4 | 70 |
| [backend/db/migrations/20240611175626-create-item.js](/backend/db/migrations/20240611175626-create-item.js) | Babel JavaScript | 77 | 0 | 3 | 80 |
| [backend/db/migrations/20240611194026-create-order.js](/backend/db/migrations/20240611194026-create-order.js) | Babel JavaScript | 46 | 0 | 3 | 49 |
| [backend/db/migrations/20240611194208-create-route.js](/backend/db/migrations/20240611194208-create-route.js) | Babel JavaScript | 43 | 0 | 3 | 46 |
| [backend/db/migrations/20240611194220-create-review.js](/backend/db/migrations/20240611194220-create-review.js) | Babel JavaScript | 47 | 1 | 4 | 52 |
| [backend/db/migrations/20240611212700-create-order-item.js](/backend/db/migrations/20240611212700-create-order-item.js) | Babel JavaScript | 57 | 0 | 3 | 60 |
| [backend/db/migrations/20240611212808-add-associations-to-order.js](/backend/db/migrations/20240611212808-add-associations-to-order.js) | Babel JavaScript | 56 | 0 | 4 | 60 |
| [backend/db/migrations/20240612191144-add-associations-to-order-item.js](/backend/db/migrations/20240612191144-add-associations-to-order-item.js) | Babel JavaScript | 52 | 0 | 9 | 61 |
| [backend/db/migrations/20240824110120-add-associations-to-item.js](/backend/db/migrations/20240824110120-add-associations-to-item.js) | Babel JavaScript | 76 | 5 | 8 | 89 |
| [backend/db/migrations/20240824115120-add-associations-to-user.js](/backend/db/migrations/20240824115120-add-associations-to-user.js) | Babel JavaScript | 44 | 5 | 8 | 57 |
| [backend/db/migrations/20240824120120-add-associations-to-review.js](/backend/db/migrations/20240824120120-add-associations-to-review.js) | Babel JavaScript | 44 | 4 | 7 | 55 |
| [backend/db/models/index.js](/backend/db/models/index.js) | Babel JavaScript | 37 | 0 | 7 | 44 |
| [backend/db/models/item.js](/backend/db/models/item.js) | Babel JavaScript | 69 | 0 | 1 | 70 |
| [backend/db/models/order.js](/backend/db/models/order.js) | Babel JavaScript | 41 | 0 | 2 | 43 |
| [backend/db/models/orderitem.js](/backend/db/models/orderitem.js) | Babel JavaScript | 46 | 0 | 2 | 48 |
| [backend/db/models/review.js](/backend/db/models/review.js) | Babel JavaScript | 33 | 0 | 1 | 34 |
| [backend/db/models/route.js](/backend/db/models/route.js) | Babel JavaScript | 30 | 0 | 2 | 32 |
| [backend/db/models/user.js](/backend/db/models/user.js) | Babel JavaScript | 100 | 0 | 4 | 104 |
| [backend/db/seeders/20240611205135-demo-users.js](/backend/db/seeders/20240611205135-demo-users.js) | Babel JavaScript | 208 | 0 | 5 | 213 |
| [backend/db/seeders/20240611205150-demo-items.js](/backend/db/seeders/20240611205150-demo-items.js) | Babel JavaScript | 257 | 0 | 7 | 264 |
| [backend/db/seeders/20240827120580-demo-reviews.js](/backend/db/seeders/20240827120580-demo-reviews.js) | Babel JavaScript | 254 | 0 | 7 | 261 |
| [backend/psql-setup-script.js](/backend/psql-setup-script.js) | Babel JavaScript | 6 | 0 | 2 | 8 |
| [backend/routes/api/index.js](/backend/routes/api/index.js) | Babel JavaScript | 49 | 4 | 18 | 71 |
| [backend/routes/api/items.js](/backend/routes/api/items.js) | Babel JavaScript | 157 | 7 | 26 | 190 |
| [backend/routes/api/orderItems.js](/backend/routes/api/orderItems.js) | Babel JavaScript | 26 | 2 | 5 | 33 |
| [backend/routes/api/orders.js](/backend/routes/api/orders.js) | Babel JavaScript | 166 | 80 | 34 | 280 |
| [backend/routes/api/reviews.js](/backend/routes/api/reviews.js) | Babel JavaScript | 74 | 7 | 13 | 94 |
| [backend/routes/api/routes.js](/backend/routes/api/routes.js) | Babel JavaScript | 6 | 4 | 12 | 22 |
| [backend/routes/api/session.js](/backend/routes/api/session.js) | Babel JavaScript | 67 | 4 | 18 | 89 |
| [backend/routes/api/users.js](/backend/routes/api/users.js) | Babel JavaScript | 153 | 8 | 28 | 189 |
| [backend/routes/index.js](/backend/routes/index.js) | Babel JavaScript | 30 | 7 | 7 | 44 |
| [backend/utils/auth.js](/backend/utils/auth.js) | Babel JavaScript | 55 | 6 | 19 | 80 |
| [backend/utils/bookingsController.js](/backend/utils/bookingsController.js) | Babel JavaScript | 102 | 2 | 16 | 120 |
| [backend/utils/spotsController.js](/backend/utils/spotsController.js) | Babel JavaScript | 191 | 7 | 24 | 222 |
| [backend/utils/validation.js](/backend/utils/validation.js) | Babel JavaScript | 56 | 5 | 11 | 72 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)