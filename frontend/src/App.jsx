import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import NoteEditorPage from '../pages/NoteEditorPage';
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <button
        onClick={() => {
          toast.success('congrats');
        }}
      >
        Click me
      </button>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/create"
          element={<CreatePage />}
        />
        <Route
          path="/note/:id"
          element={<NoteEditorPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
