import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import NoteEditorPage from '../pages/NoteEditorPage';

const App = () => {
  return (
    <div className="absolute -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_65%,#15843c_150%)]">
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
