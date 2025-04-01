import React from 'react';
import profileImg from '../assets/profile.png';
import food from '../assets/foodRecipe.png';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetails() {
    const recipe = useLoaderData();

    console.log("Recipe data:", recipe);

    // Handle cases where recipe is null or undefined
    if (!recipe) {
        return <p>Loading recipe details...</p>;
    }

    return (
        <>
            <div className='outer-container'>
                <div className='profile'>
                    <img src={profileImg} width="50px" height="50px" alt="Profile" />
                    <h5>{recipe?.email || "Unknown User"}</h5>
                </div>
                <h3 className='title'>{recipe?.title || "No title available"}</h3>
                <img 
                    src={recipe?.coverImage ? `http://localhost:5000/images/${recipe.coverImage}` : food} 
                    width="220px" 
                    height="200px" 
                    alt="Recipe" 
                />
                <div className='recipe-details'>
                    <div className='ingredients'>
                        <h4>Ingredients</h4>
                        <ul>
                            {recipe?.ingredients?.length > 0 
                                ? recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
                                : <li>No ingredients available</li>
                            }
                        </ul>
                    </div>
                    <div className='instructions'>
                        <h4>Instructions</h4>
                        <span>{recipe?.instructions || "No instructions provided"}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
