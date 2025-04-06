# Wisflux-Assignment
# Cookbook App

## Overview

The Cookbook App is a web application that allows users to create, view, and save their favorite recipes. Registered users can post recipes, which can then be viewed and searched by other users. The application includes features such as recipe creation, searching, and a favorites section.

## Features

-   **User Authentication**: Only registered users can create and view recipes.
-   **Recipe Creation**: Users can create recipes with instructions using a Quill Editor.
-   **Search Functionality**: Users can search for recipes by name.
-   **Favorites**: Users can save and view their favorite recipes.
  

## Technologies Used

-   **Frontend**:
    -   React
    -   CSS
-   **Backend**:
    -   Express
    -   JSON (for data storage)
-   **Version Control**:
    -   Git
    -   GitHub

## Setup Instructions

1.  **Clone the repository**

    ```
    git clone <repository-url>
    cd cookbook-app
    ```


4.  **Run the frontend**

    ``cd Cook-Book App`
    npm run dev
    ```

5.  **Run the backend**

    ```
    cd backend
    npm start
    ```
6. ** Issue occur while running Backend**
      ```
      npm rebuild bcrypt

     rm -rf node_modules package-lock.json
     npm install

    npm uninstall bcrypt
    npm install bcryptjs

Replace all instances of bcrypt in your code with bcryptjs:
which is present in the userfile controllers folder
// Before
const bcrypt = require('bcrypt');

// After
const bcrypt = require('bcryptjs');
 ```

## Usage Instructions

1.  **Register/Login**:
    -   Navigate to the login page to register a new account or log in with an existing account.
2.  **Home Page**:
    -   View all created recipes.
    -   Search for recipes by name using the search bar.
    -   Navigate to the favorites section.
3.  **Recipe Creator**:
    -   Create a new recipe by filling out the form.
    -   Use the Quill Editor to input recipe instructions.
    -   Upload a thumbnail image for the recipe.
4.  **Favorites**:
    -   View all your favorite recipes.
    -   Remove recipes from your favorites.
5.  **Delete Recipe**:
    -   Delete recipes you have created.

## Schema of Recipe

1.  **Name**: Name of the recipe.
2.  **Instructions**: Detailed steps to prepare the recipe.
3.  **Thumbnail Image**: Image representing the recipe.
4.  **Time**: Timestamp of when the recipe was posted.
6.  **Ingredients**: List of ingredients required for the recipe.

## API Endpoints


## Screenshots

### Home Page
![Home Page](https://pplx-res.cloudinary.com/image/upload/v1743528113/user_uploads/YiKeMQRTjvCLrGU/Screenshot-2025-04-01-224151.jpg)

### Recipes
![Recipes](https://pplx-res.cloudinary.com/image/upload/v1743528127/user_uploads/mcqgvZLRVWaGafy/Screenshot-2025-04-01-223944.jpg)

### Cake Recipes
![Cake Recipes](https://pplx-res.cloudinary.com/image/upload/v1743528238/user_uploads/tSCzpTdCaIiyXCR/Screenshot-2025-04-01-222407.jpg)

### Recipe Creation
![Recipe Creation](https://pplx-res.cloudinary.com/image/upload/v1743528523/user_uploads/VXzCbQlPvDPulod/Screenshot-2025-04-01-222253.jpg)

### videos of the project
https://drive.google.com/file/d/1BEq8nbMWHkyUJ3JdAF2A6vpyhSdCoJ4U/view?usp=sharing



