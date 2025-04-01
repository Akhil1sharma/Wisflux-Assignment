import { useState } from "react";
import axios from "axios";

const RecipeSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState("");

    // Fetch recipe suggestions
    const fetchSuggestions = async (input) => {
        setQuery(input);
        if (input.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${input}`);
            console.log("API Response:", res.data);
            setSuggestions(res.data.recipes || []);
            setError("");
        } 
        
    };

    return (
        <div>
            <input
                type="text"
                value={query}
             
                placeholder="Search for recipes..."
            />
            {error && <p className="error-message">{error}</p>}
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeSearch;
