import { Route, Routes } from 'react-router';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import NoteEditorPage from '../pages/NoteEditorPage';
import AuthUI from './components/AuthUI';

const App = () => {
  return (
    <div>
      <div className="absolute -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_65%,#15843c_150%)]" />
      <Routes>
        <Route
          path="/auth"
          element={<AuthUI />}
        />
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/create"
          element={
            <SessionAuth>
              <CreatePage />
            </SessionAuth>
          }
        />
        <Route
          path="/note/:id"
          element={
            <SessionAuth>
              <NoteEditorPage />
            </SessionAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
