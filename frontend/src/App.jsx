import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import NoteEditorPage from '../pages/NoteEditorPage';

const App = () => {
  return (
    <div data-theme="forest">
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
