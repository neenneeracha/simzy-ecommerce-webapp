# Simzy E-Commerce Web Application

  ![Simzy](frontend/public/img/readme-simzy.png) 

**Simzy E-Commerce Web Application** is a basic online clothing store where users can view clothes in several categories, buy them, and keep track of their orders to check whether the product is being delivered or not. Sellers or store admins can add products to the database to be placed on sale so that customers can purchase those products online. Retailers can also use the web application to manage information related to products, users, and orders as appropriate. Our group aims to implement the software to be used by any users with some additional features to improve accessibility for elderly. 

This project is a part of the CPE327 Software Engineering course | KMUTT


## Project Installation ##
```
git clone https://github.com/soniagtm/simzy-ecommerce-webapp.git
```

### Environment Variable File (.env) ###
Please create *.env* file in the backend folder with the following variables
```
PORT=8080
TOKEN_KEY={your jwt secret key}
STRIPE_SECRET_KEY={your stripe secret key}
```

### Database File ###
Please import *simzy.sql* file from backend/database folder to the MySQL server

## Backend Installation ##
```
cd simzy-ecommerce-webapp
cd backend
yarn
yarn start
``` 

## Frontend Installation ##
```
cd simzy-ecommerce-webapp
cd frontend
yarn
yarn start
```

## Created By SoftEn SoftJai Group
```
63070503404  Ms. JiaJia    Bai 

63070503410  Ms. Sonia     Gautam

63070503418  Ms. Tamonwan  Boonpa

63070503423  Ms. Neeracha  Seehawong

63070503446  Ms. Yuwapa    Saykhamton
```
