import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
    const { favorites, toggleFavorite } = useContext(AuthContext); // Changed to use toggleFavorite
    const [favoriteCountries, setFavoriteCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setFavoriteCountries(data.filter(country =>
                    favorites.includes(country.cca3)
                ));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchFavorites();
        } else {
            setIsLoading(false);
            setFavoriteCountries([]); // Clear favorites when empty
        }
    }, [favorites]); // Will re-run when favorites change

    if (isLoading) return <div className="loading">Loading favorites...</div>;

    return (
        <section className='favorites'>
            <h2>Your Favorite Countries</h2>
            {favoriteCountries.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className='grid'>
                    {favoriteCountries.map((country) => {
                        const { cca3, name, population, region, capital, flags } = country;
                        return (
                            <article key={cca3}>
                                <div className="card-container">
                                    <img src={flags.png} alt={name.common} />
                                    <div className='details'>
                                        <h3>{name.common}</h3>
                                        <h4>Population: <span>{population}</span></h4>
                                        <h4>Region: <span>{region}</span></h4>
                                        <h4>Capital: <span>{capital}</span></h4>
                                    </div>
                                    <div className='buttons'>
                                        <Link to={`/countries/${name.common}`} className='btn'>
                                            Learn more
                                        </Link>
                                        <button
                                            className='btn unfavorite-btn'
                                            onClick={() => toggleFavorite(cca3)}
                                            aria-label="Remove from favorites"
                                            title="Remove from favorites"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Favorites;