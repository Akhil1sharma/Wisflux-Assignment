import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../styles/AddFoodRecipe.css"; // Add a CSS file for better styling

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        file: null,
    });

    const navigate = useNavigate();

    // Handle Quill Editor Changes
    const handleQuillChange = (field, content) => {
        setRecipeData((prev) => ({ ...prev, [field]: content }));
    };

    // Handle File Input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecipeData((prev) => ({ ...prev, file }));
        }
    };

    // Submit Form
    const onHandleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (!recipeData.title.trim() || !recipeData.ingredients.trim() || !recipeData.instructions.trim()) {
            alert("Title, Ingredients, and Instructions are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("time", recipeData.time);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("instructions", recipeData.instructions);
        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        try {
            const response =  await axios.post("http://localhost:5000/recipe", recipeData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.status === 200) {
                alert("Recipe added successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting recipe:", error);
            alert("Failed to add recipe. Please try again.");
        }
    };

    return (
        <div className="recipe-container">
            <h2>Add Your Recipe</h2>
            <form className="recipe-form" onSubmit={onHandleSubmit}>
                {/* Title */}
                <div className="form-control">
                    <label>Title</label>
                    <ReactQuill value={recipeData.title} onChange={(content) => handleQuillChange("title", content)} />
                </div>

                {/* Time */}
                <div className="form-control">
                    <label>Time</label>
                    <input
                        type="text"
                        value={recipeData.time}
                        onChange={(e) => setRecipeData({ ...recipeData, time: e.target.value })}
                        placeholder="e.g., 30 minutes"
                    />
                </div>

                {/* Ingredients */}
                <div className="form-control">
                    <label>Ingredients</label>
                    <ReactQuill value={recipeData.ingredients} onChange={(content) => handleQuillChange("ingredients", content)} />
                </div>

                {/* Instructions */}
                <div className="form-control">
                    <label>Instructions</label>
                    <ReactQuill value={recipeData.instructions} onChange={(content) => handleQuillChange("instructions", content)} />
                </div>

                {/* File Upload */}
                <div className="form-control">
                    <label>Recipe Image</label>
                    <input type="file" className="input-file" name="file" onChange={handleFileChange} />
                </div>

                <button type="submit" className="submit-btn">
                    Add Recipe
                </button>
            </form>
        </div>
    );
}
