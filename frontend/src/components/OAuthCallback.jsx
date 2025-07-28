import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { thirdPartySignInAndUp } from 'supertokens-auth-react/recipe/thirdparty';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider } = useParams();

  useEffect(() => {
    console.log('Processing OAuth callback for:', provider);
    console.log('URL params:', location.search);

    thirdPartySignInAndUp()
      .then((response) => {
        if (response.status === 'OK') {
          console.log('OAuth login successful');
          navigate('/');
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