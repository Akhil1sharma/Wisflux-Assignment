import React, { useState } from 'react';
import RecipeItems from '../components/RecipeItems';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';

export default function Home() {
    // State to control modal visibility
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>Food Recipe</h1>
                    <h5>
                        It is well known that readers tend to focus on the readable content of a page rather than its layout. Lorem Ipsum is commonly used because it provides a natural distribution of letters, making it resemble standard English text rather than repetitive placeholder content.
                    </h5>
                    {/* Button to open modal for sharing a recipe */}
                    <button onClick={() => setIsOpen(true)}>Share your recipe</button>
                </div>
            </section>
            {/* Modal for input form to share a recipe */}
            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
            <div className='recipe'>
                {/* Component to display list of recipes */}
                <RecipeItems />
            </div>
        </>
    );
}
