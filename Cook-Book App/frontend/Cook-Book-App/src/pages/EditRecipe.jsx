import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/EditRecipe.css';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        file: null
    });
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipe/${id}`);
                const res = response.data;
                setRecipeData({
                    title: res.title,
                    ingredients: res.ingredients.join(","),
                    instructions: res.instructions,
                    time: res.time
                });
            } catch (error) {
                console.error("Error fetching recipe data", error);
            }
        };
        getData();
    }, [id]);

    const handleQuillChange = (field, content) => {
        setRecipeData(prev => ({ ...prev, [field]: content }));
    };

    const handleFileChange = (e) => {
        setRecipeData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("time", recipeData.time);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("instructions", recipeData.instructions);
        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        try {
            await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            });
            navigate("/myRecipe");
        } catch (error) {
            console.error("Error updating recipe", error);
        }
    };

    return (
        <div className="recipe-container">
            <h2>Edit Recipe</h2>
            <form className="recipe-form" onSubmit={onHandleSubmit}>
                <div className="form-control">
                    <label>Title</label>
                    <ReactQuill value={recipeData.title} onChange={(content) => handleQuillChange("title", content)} />
                </div>
                <div className="form-control">
                    <label>Time</label>
                    <ReactQuill value={recipeData.time} onChange={(content) => handleQuillChange("time", content)} />
                </div>
                <div className="form-control">
                    <label>Ingredients</label>
                    <ReactQuill value={recipeData.ingredients} onChange={(content) => handleQuillChange("ingredients", content)} />
                </div>
                <div className="form-control">
                    <label>Instructions</label>
                    <ReactQuill value={recipeData.instructions} onChange={(content) => handleQuillChange("instructions", content)} />
                </div>
                <div className="form-control">
                    <label>Recipe Image</label>
                    <input type="file" className="input-file" name="file" onChange={handleFileChange} />
                </div>
                <button type="submit" className="submit-btn">Update Recipe</button>
            </form>
        </div>
    );
}
