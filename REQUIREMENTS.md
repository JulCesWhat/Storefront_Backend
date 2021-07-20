# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.
+
These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    - A Index route: 'products/' [GET]
- Show
    - A SHOW route: 'products/:id' [GET]
- Create [token required]
    - A Create route: 'products/' [POST]
- [OPTIONAL] Top 5 most popular products 
    - A Top 5 route: 'products?top=:top/' [GET]
- [OPTIONAL] Products by category (args: product category)
    - A Products by category route: 'products?category=:category/' [GET]

#### Users
- Index [token required]
    - A Index route: 'users/' [GET]
- Show [token required]
    - A SHOW route: 'users/:id' [GET]
- Create N[token required]
    - A Create N[token required] route: 'users/' [POST]

#### Orders
- Current Order by user (args: user id)[token required]
    - A Current Order route: 'orders/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
    - A Completed Orders by user route: 'orders/:id' [PUT]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

Table: Product (id:string[primary key], name:varchar, price:number, category:varchar)

#### User
- id
- firstName
- lastName
- password

Table: User (id:string[primary key], username:varchar, firstname:varchar, lastname:varchar,password:VARCHAR)

#### Orders
- id
- status of order
- user_id of the user who created  the order

Table: Orders (id:string[primary key], status:varchar, user_id:string[foreign key to users table])

#### Order Items
- id
- quantity of each product in the order
- order_id of the order this item belongs to
- product_id of the product that is added to the order

Table: Order_Items (id:string[primary key], quantity:number, order_id:string[foreign key to publishers table], product_id:string[foreign key to publishers table])
