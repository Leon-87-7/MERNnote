import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import ThirdParty from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';

export function initSuperTokens() {
  console.log('API Domain:', import.meta.env.VITE_API_DOMAIN);
  console.log('Website Domain:', import.meta.env.VITE_WEBSITE_DOMAIN);
  console.log('Mode:', import.meta.env.MODE);

  SuperTokens.init({
    appInfo: {
      appName: 'MERN Notes App',
      apiDomain:
        import.meta.env.VITE_API_DOMAIN || 'http://localhost:5001',
      websiteDomain:
        import.meta.env.VITE_WEBSITE_DOMAIN ||
        'http://localhost:5173',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init({
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
              },
              {
                id: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
              },
            ],
          },
        },
      }),
      ThirdParty.init({
        signInAndUpFeature: {
          providers: [
            {
              id: 'google',
              name: 'Google',
            },
            {
              id: 'github',
              name: 'GitHub',
            },
          ],
        },
      }),
      Session.init({
        cookieSameSite: 'lax',
        cookieSecure: process.env.NODE_ENV === 'production',
      }),
    ],
  });
}
