import { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../src/components/NavBar';
import RateLimitedUI from '../src/components/RateLimitedUI';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5001/api/notes'
        );
        console.log(res.data);
      } catch (error) {
        console.log('Error fetching notes');
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
    </div>
  );
};

export default HomePage;
