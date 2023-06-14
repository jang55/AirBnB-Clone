<h1>Welcome to CampBnB</h1>

<img style="" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/848b9779-01b5-40d1-9f8c-282ecba389e0">

<a href="https://camp-bnb.onrender.com/" >Checkout CampBnB webpage right here!</a>

***

<h2>CampBnB Wiki</h2>

[Navigate to CampBnB Wiki here!](https://github.com/jang55/AirBnB-Clone/wiki)

***

<h2>Languages, Frameworks, and Technologies</h2>

 - JavaScript
 - HTML
 - CSS
 - Express
 - NodeJS
 - Sequelize
 - Sqlite
 - PostgresSQL
 - React
 - Redux
 - Git

***
<h2>About CampBnB</h2>

CampBnB is a API that let you be able to see different camping locations that are currently listed, pictures, prices, reviews, and be able to book dates!  Currently only has features to signup an account where you are able to create locations of camping spots with images and have users be able to make reviews for other locations. As a user, you are able to update or delete any locations or reviews that you have created.

***

<h2>Screenshots of CampBnB</h2>

### 1. [Landing Page](https://camp-bnb.onrender.com/)
<img width="1055" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/9cda1cdf-3920-4d54-8fe4-5454cae6eab2">


### 2. [Create a spot](https://camp-bnb.onrender.com/locations/new)
<img width="1010" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/de7d41d7-9dc1-47fe-aa63-5f0e3c166730">


### 3. [Managing current user spots with update or delete](https://camp-bnb.onrender.com/currentUser/locations)
<img width="1048" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/61c7cad0-1938-4754-9c26-964b28b8d42e">


### 4. [Details of a spot](https://camp-bnb.onrender.com/locations/1)
<img width="1037" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/4ad96bde-c91a-4995-94a0-ce541effac06">


### 5. [Reviews on the spots details page](https://camp-bnb.onrender.com/locations/1)
<img width="1027" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/665859e0-6f31-423c-85cb-ceaa4726c7d8">


### 6. [Managing all of the current user reviews with update or delete](https://camp-bnb.onrender.com/currentUser/reviews)
<img width="1034" alt="image" src="https://github.com/jang55/AirBnB-Clone/assets/95331968/56a34e43-bd25-41f3-bf89-05b24dedbf35">

***

<h2>Future Features</h2>

- Provide ablility to book a location (current reserve button on detail page is in progress)
- Provide all CRUD operations for a booking.
- Be able to add or delete images after creation of spots or reviews.
- Provide a search bar within the navigation
- Be able to "like" locations and look up all your "liked" locations

***

<h2>Want to run this project locally?</h2>

- Step 1. Begin by copying the URL link from the green "CODE" box on the right corner of all the files/folders. 
- Step 2. Go to your terminal and navigate to the folder you want to be in to clone the project.
- Step 3. Once the project has been cloned. Navigate to the backend folder and create a .env file in the root of the folder and follow the examples from ".env.example"  by change the values accordingly **after** each "=" sign.
- Step 4. Within the backend folder, use the command ***npm install***. Once that is done installing, run the commands ***npx dotenv sequelize db:migrate*** and ***npx dotenv  sequelize db:seed:all***. This will create the database for the backend in the root of the db folder and use data already provided.
- Step 5. Still within the backend folder, run ***npm start***. Your backend server should now be successfully running on the port that your provided in the .env file.
- Step 6. Navigate to the frontend folder and run ***npm install*** and ***npm start***. If successful, you should be able to see the API running within the web browser!

***









