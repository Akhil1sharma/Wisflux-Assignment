import React, { useEffect, useState, useCallback } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Navbar({ searchResults, setSearchResults }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [, setError] = useState("");

  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLogin(!token);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  // Debounced API call
  const fetchSearchResults = useCallback(
    async (query) => {
      if (query.length > 2) {
        try {
          const response = await axios.get(
            `https://forkify-api.herokuapp.com/api/search?q=${query}`
          );
          console.log("API Response:", response.data);

          if (response.data.recipes && response.data.recipes.length > 0) {
            setSearchResults(response.data.recipes);
            setNoResults(false);
            setError("");
          } else {
            setSearchResults([]);
            setNoResults(true);
          }
        } catch (err) {
          console.error("Error fetching search results:", err);
          setSearchResults([]);
          setNoResults(true);
          setError("Failed to load recipes. Please try again later.");
        }
      } else {
        setSearchResults([]);
        setNoResults(false);
      }
    },
    [setSearchResults]
  );

  // Debounce handler
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500); // Adjust debounce delay as needed (e.g., 500ms)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchSearchResults]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <header>
        <h2>Cook BOOK App</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>
          </li>
          <li onClick={checkLogin}>
            <p className="login">
              {isLogin ? "Login" : "Logout"}
              {user?.email ? `(${user?.email})` : ""}
            </p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}