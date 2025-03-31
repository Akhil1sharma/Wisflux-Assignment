import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        file: null
    });

    const navigate = useNavigate();

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData(prev => ({ ...prev, [name]: value }));
    };

    
    const handleFileChange = (e) => {
        setRecipeData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    
    

    return (
        <div className="recipe-container">
            <h2>Add Your Recipe</h2>
            <form className="recipe-form" onSubmit={onHandleSubmit}>
                
                
                <div className="form-control">
                    <label>Title</label>
                    <input type="text" name="title" value={recipeData.title} onChange={handleChange} />
                </div>

                
                <div className="form-control">
                    <label>Time</label>
                    <input type="text" name="time" value={recipeData.time} onChange={handleChange} />
                </div>

                
                <div className="form-control">
                    <label>Ingredients</label>
                    <textarea name="ingredients" value={recipeData.ingredients} onChange={handleChange} />
                </div>

                
                <div className="form-control">
                    <label>Instructions</label>
                    <textarea name="instructions" value={recipeData.instructions} onChange={handleChange} />
                </div>


                <button type="submit" className="submit-btn">Add Recipe</button>
            </form>
        </div>
    );
}
