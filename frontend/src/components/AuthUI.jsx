import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword';
import { ThirdPartyAuth } from 'supertokens-auth-react/recipe/thirdparty';

const AuthPage = () => {
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
          {/* SuperTokens will render auth forms here */}
          <EmailPasswordAuth />
          <div className="divider">OR</div>
          <ThirdPartyAuth />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
