import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        Welcome on administration interface.
        You can manage <Link to='/devices'>devices</Link> and <Link to='/users'>users</Link>
    </div>
);

export default Home;