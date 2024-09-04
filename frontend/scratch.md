
# BACKEND API DOCS 

User Authentication/Authorization 

## All endpoints that require authentication 

## All endpoints that require a current user to be logged in. 

* Request : endpoints that require authentication 
* Error Response: require authentication 
    * Status Code: 401 
    * Headers: 
       * Content-Type: application/json
    * Body:
```js
 
	{
	“message”: “Unauthorized”
	}
```
## All endpoints that require proper authorization 

### All endpoints that require authentication and the current user does not have the correct role or permissions 
* Request: endpoints that require proper authorization 
* Error Response: Require proper authorization 
   * Status Code: 403 
   * Headers: 
       * Content-Type: application/json
   * Body: 
```js
	{
	“message”: “Forbidden”
	}
```

## Log In a User

### Logs in a current user with valid credentials and returns the current user’s information
* Require Authentication: false 
* Request Method: POST
   * URL: /api/auth/login
   * Headers: 
       * Content-Type: application/json
   * Body:
```js
	{
	“email”: “john.smith@gmail.com”,
	“password”: “secret”
}
```
* Successful Response 
* Status Code: 200
   * Headers: 
       * Content-Type: application/json
   * Body: 
```js
	{
	“user”: {
		“id”: 1,
		“email”: “john.smith@gmail.com”
		“username”: “JSmith24”
}
```
* Error Response: Invalid Credentials 
* Status Code: 401 
    * Headers: 
       * Content-Type: application/json
    * Body:
```js
{
“Message”: “Invalid Credentials”
}
```
* Error Response: Body validation errors
* Status Code 400 
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
“message”: “Bad Request”
“errors” : {
	“credential” : “Email is required”,
	“password” : “Password is required”
	}
}
```

## Sign Up a User

### Creates a new user, logs them in as the current user and returns the current user’s information 

* Require Authentication: false 
* Request
   * Method: POST
   * URL: /api/auth/signup
   * Headers: 
       * Content-Type: application/json
   * Body: 
```js
{
“username”: “Demo-User”,
“email”: “demo@email.com”,
“password” : “secret100!”
}
```
* Successful Response 
* Status Code: 200
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
 “user” : {
           “id” : 1,
           “email” : “demo@email.com”,
            “username” : “Demo-User”
         }
}
```
* Error Response: User already exists with the specified email
* Status Code: 500 
    * Headers: 
       * Content-Type: application/json
    * Body:
```js
{
“message”: “User already exists”,
“errors”: {
	“email”: “User with that email already exists”
	}
}
```
* Error Response: User already exists with the specified username
    * Status Code: 500
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
“message”: “User already exists”,
“errors”: {
	“email”: “User with that username already exists”
	}
}
```
* Error Response: Body validation errors
    * Status Code 400 
    * Headers: 
       * Content-Type: application/json
    * Body:
```js
{
“message”: “Bad Request”
“errors” : {
	“email”: ‘Invalid email,
	“username”: “Username is required”
	“password” : “Password is required”
	}
}
```js

# Order

## Get all Orders for current user

### Return the Cart with items of current user
* Require Authentication: true 
   * Request 
       * Method: GET 
       * URL: /api/users/:userId/orders
       * Body: none
    * Successful Response 
        * Status Code: 200 
    * Headers: 
        * Content-Type: application/json
    * Body:

```js
{
    “Orders”: [
        {
‘id’: 1, 
“userId”; 1,
“routeId”; 2, 
“total”; $ 00.00,
“orderDate”: “YYY-DD-MM”,
“created_at”: “YYYY-DD-MM”“,
“updated_at”: “YYYY-DD-MM”
},
    ]

}
```

## Get Order details by order id

### Returns the details of a specific order 
*Require Authentication: true
   *Request
       *Method: GET
       *URL: '/api/orders/:orderId
       *Body: none

      * Successful Response 
        * Status Code: 200 
    * Headers: 
        * Content-Type: application/json
    * Body: 

``` js 
{
    “Order”: {
‘id’: 1, 
“userId”; 1,
“routeId”; 2, 
“total”; $ 00.00,
“orderDate”: “YYY-DD-MM”,
“created_at”: “YYYY-DD-MM”“,
“updated_at”: “YYYY-DD-MM”
},
    "OrderItems": [
        {
            “orderId”; 2,
            “itemId”; 1,
            “quantity”; 3,
            “units”; 1,
            “measure”; “each”,
            “pricePerUnit”; $ 00.00,
            “costPerUnit”; $ 00.00,
            “created_at”: “YYYY-DD-MM”“,
            “updated_at”: “YYYY-DD-MM”
        }
    ]

}

```


## Create an Order

### Creates and returns a new order
* Require Authentication: true
     * Request: POST 
        * URL: /api/orders
     * Headers: 
       * Content-Type: application/json
     * Body: 
```js
{
    “userId”; 1,
    “routeId”; 2, 
    “total”; $ 00.00,
}
```

* Successful Response
    * Status Code: 201
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
“id”: 1,
	“userId”; 1,
    “routeId”; 2, 
    “total”; $ 00.00,
    “orderDate”: “YYYY-MM-DD”
    “created_at”: “YYYY-MM-DD”
    “updated_at”:  “YYYY-MM-DD”
}
```

* Error Response
    * Status Code: 400 
* Headers:
    * Content-Type: application/json
* Body: 
```js
{
   “message”: “Bad Request”,
   “errors”: {
               “Name”: “Name is required”
	     }
}
```
## Edit a Order
### Update and returns an existing order
* Require Authentication: true 
* Require Proper authorization: Order must belong to the user 
    * Request
        * Method: PUT 
        * URL: /api/orders/<int:id>
    * Headers: 
        * Content-Type: application/json
    * Body: 
```js
{
   “name”: “updated name”,
   “description”: “updated description”
}
```
* Successful Response
    * Status Code: 200
      * Headers: 
          * Content-Type: application/json
    * Body: 
```js
   {
	“id”: 1,
	“owner_id”: 1,
        “name”: “updated name”, 
        “description”: “updated description”. 
        “created_at”: “YYYY-MM-DD”
        “updated_at”:  “YYYY-MM-DD”
    }
```
* Error Response: Body validation errors
    * Status Code: 400 
    * Headers:
       * Content-Type: application/json
    * Body: 
```js
{
    “message”: “Bad Request”,
    “errors”: {
              “Name”: “Name is required”
	      }
}
```
* Error Response: Couldn’t find order with the specific id
    * Status Code: 404
    * Headers:
       * Content-Type: application/json
    * Body: 
```js
{
“message”: “Board couldn’t be found” 
}
```

## Delete a Order
### Deletes an existing order
* Require Authentication: true
    * Require proper authorization: Order must belong to the current user
* Request
    * Method: DELETE
    * URL: /api/orders/<int:id>
 Body: none 

* Successful Response
    * Status Code: 200 
    * Headers:
       * Content-Type: application/json
    * Body:
```js
{
   “message”: “Successfully deleted”
}
```
* Error response: Couldn’t find a Order with the specified id 
    * Status Code: 404 
    * Headers: 
       * Content-Type: application/json
    * Body:

```js
{
“message”: “Order couldn’t be found”
}
```

# REVIEWS

## Get all Reviews by item id
### Returns all reviews that belong to an item by id

* Require Authentication: true 
    * Request: 
       * Method: GET 
       * URL: /api/items/<int:id>/reviews
    * Body: none

* Successful Response
    * Status Code: 200 
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
“Reviews” : [
            {
             ‘id’: 1,
             ‘name’: ‘first list’
             ‘board_id’: 1,
             ‘created_at’: ‘YYYY-MM-DD’
              ‘updated_at’: ‘YYYY-MM-DD’
              }
            ]
 }
```


## Create a Review

### Creates and returns a new Review
* Require Authentication: true
   * Request: POST 
       * URL: /api/reviews/
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
   ‘name’: ‘a new list’
   ‘board_id’: 1 
}
```
Successful Response
Status Code: 201
Headers: 
Content-Type: application/json
Body: 
```js
{
  “id”: 1,
  ‘board_id’: 1
  “name”: “a new list”, 
  “created_at”: “YYYY-MM-DD”
  “updated_at”:  “YYYY-MM-DD”
 }
```
* Error Response: Body validation
    * Status Code: 400 
    * Headers:
       * Content-Type: application/json
    Body: 
```js
{
  “message”: “Bad Request”,
             “errors”: {
                        “Name”: “Name is required”
	               }
}
```

## Edit a Review 

### Edits and returns an existing Review
* Require Authentication: true
    * Request: PUT
    * URL: /api/reviews/<int:id>
    * Headers: 
       * Content-Type: application/json
    * Body: 
```js
{
  ‘name’: ‘updated list’
  ‘item_id’: 1 
}
```
* Successful Response
    * Status Code: 201
    * Headers: 
      * Content-Type: application/json
    * Body: 
```js
{
  “id”: 1,
  ‘board_id’: 1
  “name”: “updated list”, 
  “created_at”: “YYYY-MM-DD”
  “updated_at”:  “YYYY-MM-DD”
}
```
* Error Response: Body validation
    * Status Code: 400 
    * Headers:
       * Content-Type: application/json
    * Body: 
```js
{
  “message”: “Bad Request”,
   “errors”: {
               “Name”: “Name is required”
	      }
}
```


## Delete a Review  
### Deletes an existing review
* Require Authentication: true
   * Request
   * Method: DELETE
   * URL: /api/reviews/<int:id>
* Body: none 

* Successful Response
    * Status Code: 200 
    * Headers:
       * Content-Type: application/json
    * Body:
```js
{
 “message”: “Successfully deleted”
}

Error response: Couldn’t find a Review with the specified id 
Status Code: 404 
Headers: 
Content-Type: application/json
Body: 
{
 “message”: “List couldn’t be found”
}
```
