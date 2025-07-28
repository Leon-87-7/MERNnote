import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import SuperTokens, {
  SuperTokensWrapper,
} from 'supertokens-auth-react';
import { initSuperTokens } from './lib/supertokens.js';
import './index.css';
import App from './App.jsx';

initSuperTokens();

createRoot(document.getElementById('root')).render(
  <>
    <SuperTokensWrapper>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </SuperTokensWrapper>
  </>
);
