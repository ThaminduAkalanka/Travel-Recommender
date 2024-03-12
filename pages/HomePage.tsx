// HomePage.tsx

import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const HomePage: React.FC = () => {
  const history = useHistory();

  const handleGetRecommendationsClick = () => {
    // Navigate to the recommendations page
    history.push('/index');
  };

  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Your Travel Companion</h1>
        <p>Your one-stop destination for personalized travel recommendations</p>
      </header>

      {/* ... (other sections) */}

      <section className="get-recommendations">
        <h2>Get Recommendations</h2>
        <p>Discover your next adventure with personalized recommendations.</p>
        <button onClick={handleGetRecommendationsClick}>Get Recommendations</button>
      </section>

      {/* ... (other sections) */}
    </div>
  );
};

export default HomePage;
