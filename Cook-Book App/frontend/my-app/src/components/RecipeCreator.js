import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function RecipeCreator() {
    const [recipeName, setRecipeName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [ingredients, setIngredients] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [postedBy, setPostedBy] = useState('');
    const fileInputRef = useRef(null); // Ref for file input
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (recipeName) {
                try {
                    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);
                    const data = await response.json();
                    if (data.recipes) {
                        setSuggestions(data.recipes.map(recipe => recipe.title));
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timerId = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce the API call

        return () => clearTimeout(timerId);
    }, [recipeName]);

    const handleNameChange = (e) => {
        setRecipeName(e.target.value);
    };

    const handleInstructionChange = (value) => {
        setInstructions(value);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('instructions', instructions);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        formData.append('ingredients', ingredients);
        formData.append('postedBy', postedBy);
        formData.append('postedAt', new Date().toISOString());

        try {
            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            console.log('Recipe created successfully!');
            navigate('/'); // Redirect to home page after creating recipe
        } catch (error) {
            console.error('Error creating recipe:', error);
            alert('Error creating recipe: ' + error.message);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div className="recipe-creator">
            <h2>Create a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input
                        type="text"
                        id="recipeName"
                        value={recipeName}
                        onChange={handleNameChange}
                        required
                        list="recipeSuggestions"
                    />
                    <datalist id="recipeSuggestions">
                        {suggestions.map((suggestion, index) => (
                            <option key={index} value={suggestion} />
                        ))}
                    </datalist>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        id="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions:</label>
                    <ReactQuill
                        id="instructions"
                        value={instructions}
                        onChange={handleInstructionChange}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail Image:</label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        ref={fileInputRef} // Attach ref to the file input
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postedBy">Posted By:</label>
                    <input
                        type="text"
                        id="postedBy"
                        value={postedBy}
                        onChange={(e) => setPostedBy(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
}

export default RecipeCreator;
