<hr>
<h1 style="text-align:center;width:100%;">Video Streaming Subscription Service</h1>
<hr>

- [:rocket: Getting Started](#rocket-getting-started)
- [:mag: Salient Features](#mag-salient-features)
- [:airplane: Routes](#airplane-routes)
  - [:key: /user](#key-user)
    - [/signup](#signup)
    - [/login](#login)
    - [/me](#me)
  - [:book: /plans](#book-plans)
    - [/fetch](#fetch)
    - [/fetch/:id](#fetchid)
  - [:dollar: /subscription](#dollar-subscription)
    - [/create](#create)
    - [/fetch](#fetch-1)
    - [/cancel/:id](#cancelid)
  - [:credit_card: /stripe](#credit_card-stripe)
    - [/create](#create-1)
    - [/cancel](#cancel)

## :rocket: Getting Started

1. Clone the repository from `https://github.com/ajaytitus1386/richpanel-task-backend` using your preferred method.
2. Next, navigate to the root of the project and install the dependencies:

```bash
npm install
```

3. Then, run the **server** on port 4000:

```bash
npm start
```

### Or better yet just use the deployed API at [https://richpanel-task-backend.herokuapp.com/](https://richpanel-task-backend.herokuapp.com/)

Also check out the frontend web app at [https://github.com/ajaytitus1386/richpanel-task-frontend](https://github.com/ajaytitus1386/richpanel-task-frontend)

## :mag: Salient Features

- Node.JS with Express and MongoDB for database management
- Use a combination of a MongoDB Atlas Cluster and a Stripe API Account to manage subscriptions
- Handles authentication using JSON Web Token

## :airplane: Routes

### :key: /user

#### /signup

- **Method**: POST
- **Description**: Register a new user in the database, encrypts the password before saving the document and then signs a JSON Web Token
- **Body Data**: Username, email and password
- **Response**: Returns a valid JWT

#### /login

- **Method**: POST
- **Description**: Locates a stored user in the database by its email and matches it by the hashed password and signs a JWT
- **Body Data**: Email and password
- **Response**: Returns a valid JWT

#### /me

- **Method**: GET
- **Description**: Verifies a recieved JWT
- **Headers Token**: token : JWT
- **Response**: Returns a user model

### :book: /plans

#### /fetch

- **Method**: GET
- **Description**: Fetches all plans in the database
- **Response**: Returns a list of Plans

#### /fetch/:id

- **Method**: GET
- **Description**: Fetches a specific plan by its ID in the database
- **Response**: Returns one Plan

### :dollar: /subscription

#### /create

- **Method**: POST
- **Description**: Adds a new subscription for a given user to a given plan
- **Body Data**: See subscription model

#### /fetch

- **Method**: GET
- **Description**: Adds a new subscription for a given user to a given plan
- **Query Param**: User ID in request query
- **Response**: Returns a single subscription

#### /cancel/:id

- **Method**: PATCH
- **Description**: Updates the isActive field of specified subscription to FALSE

### :credit_card: /stripe

#### /create

- **Method**: POST
- **Description**: Creates a new customer and subscription payment
- **Body Data**: Email, Payment method id, Price ID (of product via STRIPE API)
- **Response**: Returns a subscription ID and a Client Secret to complete the subscription payment on frontend

#### /cancel

- **Method**: POST
- **Description**: Cancels an Active subscription via the Stripe API
- **Body Data**: Subscription ID
