import { Route, Routes } from 'react-router';
import * as reactRouterDom from 'react-router';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';

import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import NoteEditorPage from '../pages/NoteEditorPage';

const App = () => {
  return (
    <div>
      <div className="absolute -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_65%,#15843c_150%)]" />
      <Routes>
        {/* SuperTokens auth routes*/}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          EmailPasswordPreBuiltUI,
          ThirdPartyPreBuiltUI,
        ])}
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
