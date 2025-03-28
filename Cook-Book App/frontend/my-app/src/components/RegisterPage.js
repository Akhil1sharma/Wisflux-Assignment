import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/components/HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Access isAuthenticated from useAuth

  const handleCreateRecipeClick = () => {
    if (isAuthenticated()) {
      navigate('/create-recipe'); // Redirect to create recipe page
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h1>Welcome to Cookbook App</h1>
        <p>Discover, create, and share your favorite recipes with our community!</p>
        <button onClick={handleCreateRecipeClick}>Create Recipe</button>
      </section>

      <section className="introduction">
        <h2>About Us</h2>
        <p>
          Cookbook App is a platform where food enthusiasts can explore new recipes, share their own creations, and connect with like-minded individuals.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; Cookbook App 2025</p>
      </footer>
    </div> 
  );
}

export default HomePage;
