import NavBar from '../src/components/NavBar';
import { useState } from 'react';
import RateLimitedUI from '../src/components/RateLimitedUI';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
    </div>
  );
};

export default HomePage;
