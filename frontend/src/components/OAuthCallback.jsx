import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import ThirdParty from 'supertokens-auth-react/recipe/thirdparty';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider } = useParams();

  useEffect(() => {
    console.log('Processing OAuth callback for:', provider);
    console.log('URL params:', location.search);

    ThirdParty.signInAndUp()
      .then((response) => {
        if (response.status === 'OK') {
          console.log('OAuth login successful');
          if (response.createdNewRecipeUser) {
            console.log('New user created');
          } else {
            console.log('Existing user logged in');
          }
          navigate('/');
        } else if (response.status === 'NO_EMAIL_GIVEN_BY_PROVIDER') {
          console.error('OAuth provider did not provide email');
          navigate('/auth');
        } else if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
          console.error('Sign in/up not allowed:', response.reason);
          navigate('/auth');
        } else {
          console.error('OAuth login failed:', response);
          navigate('/auth');
        }
      })
      .catch((error) => {
        console.error('OAuth callback error:', error);
        navigate('/auth');
      });
  }, [navigate, location.search, provider]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4 text-lg">Processing {provider} login...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;