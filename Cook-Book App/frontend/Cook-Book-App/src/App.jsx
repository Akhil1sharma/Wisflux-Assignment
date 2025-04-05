import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";

// API Base URL
const API_URL = "http://localhost:5000";

// Fetch all recipes
const getAllRecipes = async () => {
  try {
    const res = await axios.get(`${API_URL}/recipe/recipes`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// Fetch user-specific recipes
const getMyRecipes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allRecipes = await getAllRecipes();
  return allRecipes.filter((recipe) => recipe.createdBy === user._id);
};

// Fetch favorite recipes
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || [];
};

// Fetch a single recipe with creator details
const getRecipe = async ({ params }) => {
  try {
    const recipeRes = await axios.get(`${API_URL}/recipes/${params.id}`);
    let recipe = recipeRes.data;

    const userRes = await axios.get(`${API_URL}/user/${recipe.createdBy}`);
    return { ...recipe, email: userRes.data.email };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainNavigation
          setSearchResults={setSearchResults}
          searchResults={searchResults}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home searchResults={searchResults} />,
          loader: getAllRecipes,
        },
        {
          path: "/myRecipe",
          element: <Home />,
          loader: getMyRecipes,
        },
        {
          path: "/favRecipe",
          element: <Home />,
          loader: getFavRecipes,
        },
        {
          path: "/addRecipe",
          element: <AddFoodRecipe />,
        },
        {
          path: "/editRecipe/:id",
          element: <EditRecipe />,
        },
        {
          path: "/recipe/:id",
          element: <RecipeDetails />,
          loader: getRecipe,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
