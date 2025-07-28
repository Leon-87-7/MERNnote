import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { redirectToThirdPartyLogin } from 'supertokens-auth-react/recipe/thirdparty';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    try {
      const formFields = [
        { id: 'email', value: email },
        { id: 'password', value: password },
      ];

      const response = isSignUp 
        ? await signUp({ formFields })
        : await signIn({ formFields });

      if (response.status === 'OK') {
        window.location.assign('/');
      } else {
        console.error('Auth failed:', response);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleThirdPartyLogin = (provider) => {
    redirectToThirdPartyLogin({ thirdPartyId: provider });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            MERN.note
          </h1>
          <p className="text-base-content/70 mt-2">
            Sign in to your account
          </p>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <form
            onSubmit={handleEmailPasswordAuth}
            className="space-y-4"
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="btn btn-ghost btn-sm"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="divider">OR</div>

          <div className="space-y-2">
            <button
              onClick={() => handleThirdPartyLogin('google')}
              className="btn btn-outline w-full"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              onClick={() => handleThirdPartyLogin('github')}
              className="btn btn-outline w-full"
            >
              <GitHubIcon /> Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
