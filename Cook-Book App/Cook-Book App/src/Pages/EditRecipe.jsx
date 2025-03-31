import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
        file: null
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const onHandleChange = (e) => {
        let val = e.target.name === "file" ? e.target.files[0] : e.target.value;
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
    };

    return (
        <>
            <div className='container'>
                <form className='form'>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} value={recipeData.ingredients}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="button">Edit Recipe</button>
                </form>
            </div>
        </>
    );
}
