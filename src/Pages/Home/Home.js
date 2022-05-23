import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Reviews from './Reviews';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Tools></Tools>
            <Reviews></Reviews>
            <Contact></Contact>
        </div>
    );
};

export default Home;