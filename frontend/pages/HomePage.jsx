import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PuffLoader } from 'react-spinners';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Link } from 'react-router';

import NavBar from '../src/components/NavBar';
import RateLimitedUI from '../src/components/RateLimitedUI';
import NoteCard from '../src/components/NoteCard';
import api from '../src/lib/axios';
import NotesNotFound from '../src/components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = useSessionContext();

  useEffect(() => {
    const fetchNotes = async () => {
      // Only fetch notes if user is authenticated
      if (!session.doesSessionExist) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes');
        console.log(error.response);
        if (error.response?.status === 401) {
          // Session expired, redirect to auth
          window.location.href = '/auth';
        } else if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!session.loading) {
      fetchNotes();
    }
  }, [session.loading, session.doesSessionExist]);

  // Show loading while session is being checked
  if (session.loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="flex flex-col items-center text-center text-primary py-10">
          Loading...
          <br />
          <br />
          <PuffLoader
            color="#18a048"
            size={60}
          />
        </div>
      </div>
    );
  }

  // Show welcome page for non-authenticated users
  if (!session.doesSessionExist) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="max-w-4xl mx-auto p-4 mt-20 text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Welcome to MERN.note
          </h1>
          <p className="text-xl text-base-content/70 mb-8">
            Your personal note-taking app. Sign in to start organizing
            your thoughts.
          </p>
          <Link
            to="/auth"
            className="btn btn-primary btn-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="flex flex-col items-center text-center text-primary py-10">
            Loading notes...
            <br />
            <br />
            <PuffLoader
              color="#18a048"
              size={60}
            />
          </div>
        )}

        {notes.length === 0 && !loading && !isRateLimited && (
          <NotesNotFound />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
