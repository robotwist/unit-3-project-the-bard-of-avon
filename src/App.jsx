// Shakespeare Motivational App - Show Surrounding Lines

// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { fetchShakespeareQuote } from './utils/fetchQuotes';
import QuoteDisplay from './components/QuoteDisplay';
import './App.css';

const ShakespeareApp = () => {
    const [quote, setQuote] = useState({ previous: '', current: '', next: '' });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userPrompt, setUserPrompt] = useState('');

    useEffect(() => {
        getQuote();
    }, []);

    const getQuote = async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const { previous, current, next } = await fetchShakespeareQuote(userPrompt, true); // Fetch with surrounding lines
            
            // Remove any <br/> tags from the fetched quotes
            const cleanQuote = {
                previous: previous.replace(/<br\s*\/?>/g, '\n'),
                current: current.replace(/<br\s*\/?>/g, '\n'),
                next: next.replace(/<br\s*\/?>/g, '\n')
            };
            
            setQuote(cleanQuote);
        } catch (error) {
            setErrorMessage("Failed to fetch quote. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <h1>Magic Shakespeare Says</h1>
            {loading && <p>Loading...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!loading && !errorMessage && <QuoteDisplay quote={quote} />}
            <input
                type="text"
                placeholder="Enter your thoughts and see what magic Shakespeare has to say."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button onClick={getQuote}>Quote</button>
        </div>
    );
};

export default ShakespeareApp;
